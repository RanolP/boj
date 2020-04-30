import { mixed, string, InferType, StringSchema, MixedSchema } from 'yup';
import { inherits } from 'util';
import runValidations from 'yup/lib/util/runValidations';

type Result<K extends string, V> = MixedSchema<Record<K, InferType<V>>>;

export const MapSchema = (function <K extends string, V>(
  this: Result<K, V>,
  keySchema: StringSchema<K>,
  valueSchema: V,
): Result<K, V> {
  if (!(this instanceof MapSchema)) {
    return new (MapSchema as any)(keySchema, valueSchema);
  }

  (mixed as any).call(this, { type: 'map' });

  (this as any).key = keySchema || string();
  (this as any).value = valueSchema || mixed();

  return this;
} as any) as {
  new <K extends string, V>(keySchema: StringSchema<K>, valueSchema: V): Result<
    K,
    V
  >;
};

inherits(MapSchema, mixed);

Object.assign(MapSchema.prototype, {
  _typeCheck(value: any) {
    return value && typeof value === 'object';
  },

  _cast(_value: any, options: any) {
    if (!_value) {
      return _value;
    }
    const value = mixed.prototype._cast.call(this, _value, options);

    const result: any = {};
    Object.entries(value).forEach(([key, aValue]) => {
      result[(this as any).key.cast(key)] = (this as any).value.cast(aValue);
    });

    return result;
  },

  _validate(_value: any, options: any = {}) {
    const errors: any[] = [];
    const { abortEarly, sync, path = '' } = options;

    let originalValue =
      options.originalValue != null ? options.originalValue : _value;

    let promise = mixed.prototype._validate.call(this, _value, options);

    if (!abortEarly)
      promise = promise.catch((err: any) => {
        errors.push(err);
        return err.value;
      });

    return promise.then((value: any) => {
      if (!this._typeCheck(value)) {
        if (errors.length) throw errors[0];
        return value;
      }

      originalValue = originalValue || value;

      const validations: any[] = [];
      Object.entries(value).forEach(([field, fieldValue]) => {
        const innerOptions = {
          ...options,
          strict: true,
          parent: value,
          path: path ? `${path}.${field}` : field,
          originalValue: originalValue[field],
        };

        validations.push(
          (this as any).key.validate(field, innerOptions),
          (this as any).value.validate(fieldValue, innerOptions),
        );
      });

      return runValidations({
        sync,
        path,
        value,
        errors,
        validations,
        endEarly: abortEarly,
      });
    });
  },
});
