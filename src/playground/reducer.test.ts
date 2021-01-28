interface Pet {
  type: 'dog' | 'cat';
  numberOfFeet: number;
}

describe('reducers', () => {
  describe('adding number', () => {
    const numbers = [1, 33, 44, 2];
    let value: number;

    const reducer = (acc: number, curr: number) => {
      return acc + curr;
    }

    beforeEach(() => {
      value = numbers.reduce<number>(reducer, 0);
    });

    it('adds the numbers', () => {
      expect(value).toEqual(80);
    });
  });

  describe('concatenating strings', () => {
    const strings = ['a', 'b', 'c'];
    let value: string;

    const reducer = (acc: string, curr: string) => {
      return `${acc}${curr}`;
    }

    beforeEach(() => {
      value = strings.reduce<string>(reducer, '');
    });

    it('concatenates the strings', () => {
      expect(value).toEqual('abc');
    });
  });

  describe('multiplies strings', () => {
    const strings = ['a', 'b', 'c'];
    let value: string;

    const reducer = (acc: string, curr: string) => {
      return `${acc}${curr}x`;
    }

    beforeEach(() => {
      value = strings.reduce<string>(reducer, '');
    });

    it('concatenates the strings', () => {
      expect(value).toEqual('axbxcx');
    });
  });

  describe('objects', () => {
    const pets: Pet[] = [{
      type: 'dog',
      numberOfFeet: 4,
    }, {
      type: 'cat',
      numberOfFeet: 4
    }];
    let value: Pet[];

    const reducer = (acc: Pet[], curr: Pet) => {
      return [
        ...acc,
        { ...curr, numberOfFeet: 3 },
      ];
    }

    beforeEach(() => {
      value = pets.reduce<Pet[]>(reducer, []);
    });

    it('mutates the objects', () => {
      expect(value[0].numberOfFeet).toEqual(3);
    })
  });
});