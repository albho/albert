import React, { useState } from 'react';

abstract class Shoe {
  public name: string;

  public getName(): string {
    return this.name;
  }

  public features(): string[] {
    return [''];
  }
}

abstract class ShoeFeatures extends Shoe {
  decoratedShoe: Shoe;
  public abstract features(): string[];
}

class Shoe1 extends Shoe {
  public name = 'Shoe 1';
}

class Shoe2 extends Shoe {
  public name = 'Shoe 2';
}

class WaterproofFeature extends ShoeFeatures {
  decoratedShoe: Shoe;

  constructor(shoe: Shoe) {
    super();
    this.name = shoe.name;
    this.decoratedShoe = shoe;
  }

  public features(): string[] {
    return [...this.decoratedShoe.features(), 'Waterproof'];
  }
}

class GoretexFeature extends ShoeFeatures {
  decoratedShoe: Shoe;

  constructor(shoe: Shoe) {
    super();
    this.name = shoe.name;
    this.decoratedShoe = shoe;
  }

  public features(): string[] {
    return [...this.decoratedShoe.features(), 'Goretex'];
  }
}

const ShoeDecorator = () => {
  const [shoe, setShoe] = useState<Shoe | ShoeFeatures>();

  return (
    <div className="demo">
      <div>
        {shoe?.getName() ?? 'Shoe X'}:{' '}
        {shoe?.features().map((feature, i) => {
          if (!feature) return;
          return <span key={i}>[{feature}]</span>;
        })}
      </div>
      <br />
      <hr />
      <br />
      <div>
        Select shoe:{' '}
        <button onClick={() => setShoe(new Shoe1())}>Shoe 1</button>
        <button onClick={() => setShoe(new Shoe2())}>Shoe 2</button>
      </div>
      <div>
        Add feature:{' '}
        <button
          onClick={() => {
            if (!shoe || shoe.features().includes('Waterproof')) return;
            const waterproofedShoe = new WaterproofFeature(shoe);
            setShoe(waterproofedShoe);
          }}
        >
          Waterproof
        </button>
        <button
          onClick={() => {
            if (!shoe || shoe.features().includes('Goretex')) return;
            const cushionedShoe = new GoretexFeature(shoe);
            setShoe(cushionedShoe);
          }}
        >
          Goretex
        </button>
      </div>
    </div>
  );
};

export default ShoeDecorator;
