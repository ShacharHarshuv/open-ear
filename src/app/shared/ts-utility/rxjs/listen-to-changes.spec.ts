import { listenToChanges } from "./listen-to-changes";
import { ObservableSpy } from "./observable-spy/observable-spy";

describe('listen to changes', function () {
  it('should emit in changes of a simple property', () => {
    class MyClass {
      myValue: number = 1;

      readonly myValue$ = listenToChanges(this, 'myValue');
    }

    const a = new MyClass();

    ObservableSpy.spyOn(a.myValue$);

    expect(a.myValue$).toHaveOnlyEmitted(1);
    expect(a.myValue).toEqual(1);
    ObservableSpy.resetEmissions(a.myValue$);

    a.myValue = 2;
    expect(a.myValue$).toHaveOnlyEmitted(2);
    expect(a.myValue).toEqual(2);
  });

  it('should throw error of property is not initialized', () => {
    class MyClass {
      readonly myValue$ = listenToChanges(this, 'myValue');
      myValue: number = 1;
    }

    expect(() => new MyClass()).toThrow();
  });

  it('should respect existing getters/setters', () => {
    class MyClass {
      private _myValue: number = 1;
      factor = 2;

      get myValue(): number {
        return this._myValue * this.factor;
      }

      set myValue(v: number) {
        this._myValue = v;
      }

      readonly myValue$ = listenToChanges(this, 'myValue');
    }

    const a = new MyClass();

    ObservableSpy.spyOn(a.myValue$);

    expect(a.myValue$).toHaveOnlyEmitted(2);
    expect(a.myValue).toEqual(2);
    ObservableSpy.resetEmissions(a.myValue$);

    a.myValue = 2;
    expect(a.myValue$).toHaveOnlyEmitted(4);
    expect(a.myValue).toEqual(4);
    ObservableSpy.resetEmissions(a.myValue$);

    // in case of unpure getters the original getter should still be invoked, but observable will not emit
    a.factor = 3;
    expect(a.myValue).toEqual(6);
    expect(a.myValue$).not.toHaveHadEmissions();
  });

  it('should throw if property only has a getter', () => {
    class MyClass {
      get myValue(): number {
        return 1;
      }
      readonly myValue$ = listenToChanges(this, 'myValue');
    }

    expect(() => new MyClass()).toThrow();
  });

  it('should throw if property only has a setter', () => {
    class MyClass {
      set myValue(v: number) {}
      readonly myValue$ = listenToChanges(this, 'myValue');
    }

    expect(() => new MyClass()).toThrow();
  });
});
