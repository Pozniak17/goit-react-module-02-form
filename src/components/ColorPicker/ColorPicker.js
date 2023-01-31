import React, { Component } from 'react';
import classNames from 'classnames';
import './ColorPicker.css';

class ColorPicker extends Component {
  state = {
    activeOptionIdx: 0,
  };

  setActiveIdx = index => {
    this.setState({ activeOptionIdx: index });
  };

  makeOptionClassName = index => {
    // const optionClasses = ['ColorPicker__option'];

    //todo викликаємо, в середину передаємо класи як аргументи, які повині буде за замовчуванням, а в об'єкт лиш те, що повинно виконуватися за умовою, або передаємо в className на 44 рядку. Пакет classname для складання динамічних класів в компонентах. Зверху ті що за замовчуванням(дефолтні), а в об'єкт ті що залежать від умови.
    return classNames('ColorPicker__option', 'q', 'a', {
      'ColorPicker__option--active': index === this.state.activeOptionIdx,
    });

    // console.log(clsx);

    // if (index === this.state.activeOptionIdx) {
    //   optionClasses.push('ColorPicker__option--active');
    // }

    // return optionClasses.join(' ');
  };

  render() {
    const { activeOptionIdx } = this.state;
    const { options } = this.props;
    const { label } = options[activeOptionIdx];

    return (
      <div className="ColorPicker">
        <h2 className="ColorPicker__title">Color Picker</h2>
        <p>Выбран цвет: {label}</p>
        <div>
          {options.map(({ label, color }, index) => (
            <button
              key={label}
              className={this.makeOptionClassName(index)}
              style={{ backgroundColor: color }}
              onClick={() => this.setActiveIdx(index)}
            ></button>
          ))}
        </div>
      </div>
    );
  }
}

export default ColorPicker;
