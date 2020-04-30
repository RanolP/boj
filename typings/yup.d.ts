declare module 'yup/lib/util/runValidations' {
  function runValidations(options: {
    sync: any;
    path: any;
    value: any;
    errors: any;
    validations: any;
    endEarly: any;
  }): any;

  export default runValidations;
}
