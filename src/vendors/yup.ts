import {
  mixed,
  string,
  Ref,
  Schema,
  InferType,
  TestOptions,
  ValidateOptions,
  StringSchema,
} from 'yup';
import { inherits } from 'util';
import runValidations from 'yup/lib/util/runValidations';

const MixedSchema = mixed;

type Result<K extends string, V> = Schema<Record<K, InferType<V>>> | Ref;

export const MapSchema = (function <K extends string, V>(
  this: Result<K, V>,
  keySchema: StringSchema<K>,
  valueSchema: V,
): Result<K, V> {
  if (!(this instanceof MapSchema)) {
    return new (MapSchema as any)(keySchema, valueSchema);
  }

  (MixedSchema as any).call(this, { type: 'map' });

  (this as any).key = keySchema || string();
  (this as any).value = valueSchema || mixed();

  return this;
} as any) as {
  new <K extends string, V>(keySchema: StringSchema<K>, valueSchema: V): Result<
    K,
    V
  >;
};

inherits(MapSchema, MixedSchema);

Object.assign(MapSchema.prototype, {
  _typeCheck(value: any) {
    return value && typeof value === 'object';
  },

  _cast(_value: any, options: any) {
    const value = MixedSchema.prototype._cast.call(this, _value, options);

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

    let promise = MixedSchema.prototype._validate.call(this, _value, options);

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
