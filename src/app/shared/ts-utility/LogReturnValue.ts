export function LogReturnValue(label?: string): MethodDecorator {
  return function (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ): void {
    const childFunction = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const returnedValue = childFunction.apply(this, args);
      console.log(label || '', propertyKey, returnedValue);
      return returnedValue;
    };
  };
}

export function LogAsyncReturnValue(label?: string): MethodDecorator {
  return function (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ): void {
    const childFunction = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const returnedValue = await childFunction.apply(this, args);
      console.log(label || '', propertyKey, returnedValue);
      return returnedValue;
    };
  };
}
