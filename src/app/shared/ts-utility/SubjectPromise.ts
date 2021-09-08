import * as _ from 'lodash';

export class SubjectPromise<T> implements Promise<T> {
  resolve: (value: T | PromiseLike<T>) => void = _.noop;
  reject: (reason?: any) => void = _.noop;
  readonly [Symbol.toStringTag]: string;
  private readonly _promise = new Promise<T>((resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => {
    this.resolve = resolve;
    this.reject = reject;
  });

  catch<TResult = never>(onrejected?: ((reason: any) => (PromiseLike<TResult> | TResult)) | undefined | null): Promise<T | TResult> {
    return this._promise.catch(onrejected);
  }

  finally(onfinally?: (() => void) | undefined | null): Promise<T> {
    return this._promise.finally(onfinally);
  }

  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => (PromiseLike<TResult1> | TResult1)) | undefined | null,
    onrejected?: ((reason: any) => (PromiseLike<TResult2> | TResult2)) | undefined | null,
  ): Promise<TResult1 | TResult2> {
    return this._promise.then(onfulfilled, onrejected);
  }
}
