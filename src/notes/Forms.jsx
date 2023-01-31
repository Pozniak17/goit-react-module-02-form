// import { nanoid } from 'nanoid';
// import { Component } from 'react';
// /*
//  ! Module 2 - Lesson 4 - Forms */
// //! Модуль 2 - Заняття 4 - Форми

// //* Форми

// //! Неконтрольовані елементи
// /*
//  * Основна мета будь-якої форми - отримати дані користувача. Для цього під час сабміту можна отримати значення полів з її властивості elements або, використовуючи FormData. Такий прийом доречно використовувати, коли дані полів форми потрібні тільки під час її сабміту. */
// export class LoginForm extends Component {
//   handleSubmit = evt => {
//     evt.preventDefault();
//     const form = evt.currentTarget;
//     const login = form.elements.login.value;
//     const password = form.elements.password.value;
//     console.log(login, password); // логіниться в консолі при сабміті
//     this.props.onSubmit({ login, password });
//     form.reset();
//   };

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <input type="text" name="login" />
//         <input type="text" name="password" />
//         <button type="submit">Login</button>
//       </form>
//     );
//   }
// }

// //! Контрольовані елементи
// /*
//  * Якщо значення елементів форм необхідно отримати в момент зміни поля і зробити щось динамічно, вони повинні бути контрольовані. Тобто значення всіх полів повинні бути в state. Цей прийом роботи з елементами форм - досить простий. */
// /*
// * Поле в state визначає значення атрибути value поля
// * Події onChange передається метод, що змінює поле в стані

//  Отримуємо замнене коло.

//  * Під час події onChange метод класу оновлює поле в стані
//  * Під час зміни стану відбувається ререндер
//  * Інпут відображається з оновленими даними*/

// //  Недолік у тому, що вся форма буде повторно рендеритися під час кожної зміни будь-якого поля, але для невеликих форм - це не проблема.
// export class AppNotes extends Component {
//   state = {
//     inputValue: '',
//   };

//   handleChange = evt => {
//     this.setState({ inputValue: evt.target.value });
//   };

//   render() {
//     const { inputValue } = this.state;
//     return (
//       <input type="text" value={inputValue} onChange={this.handleChange} />
//     );
//   }
// }
// //Моя примітка: тут в нас форма просто змінює state та кожен раз повторно рендериться.

// //* Виходить, що не інтерфейс визначає, які у нас дані, а навпаки, - дані визначають те, що бачить користувач, оновлюючи DOM під час зміни стану компонента.

// //! Складні форми
// // Створимо форму реєстрації.
// // export class SignUpForm extends Component {
// //   state = {
// //     login: '',
// //   };

// //   // Відповідає за оновлення стану
// //   handleChange = e => {
// //     this.setState({ login: e.target.value });
// //   };

// //   // Викликається під час відправлення форми
// //   handleSubmit = evt => {
// //     evt.preventDefault();
// //     console.log(`Signed up as : ${this.state.login}`);

// //     // Проп, який передається формі для виклику під час сабміту
// //     this.props.onSubmit({ ...this.state });
// //   };

// //   render() {
// //     const { login } = this.state;
// //     return (
// //       <form onSubmit={this.handleSubmit}>
// //         <label>
// //           Name
// //           <input
// //             type="text"
// //             placeholder="Enter login"
// //             value={login}
// //             onChange={this.handleChange}
// //           />
// //         </label>

// //         <button type="submit">Sign up as {login}</button>
// //       </form>
// //     );
// //   }
// // }

// /*
//  * Додамо поля для email і password, а заразом використаємо дуже корисний патерн для callback-функції, що передається в onChange. */

// // Винесемо об'єкт із примітивами в константу, щоб було зручно скидати.
// // Не можна використовувати, якщо в якійсь властивості стану зберігається складний тип.
// const INITIAL_STATE = {
//   login: '',
//   email: '',
//   password: '',
// };

// export class SignUpForm extends Component {
//   state = { ...INITIAL_STATE };

//   // Для всіх інпутів створюємо одни обробник
//   // Розрізняти інпути будемо за атрибутом name
//   handleChange = evt => {
//     const { name, value } = evt.target;
//     this.setState({ [name]: value });
//   };

//   handleSubmit = evt => {
//     evt.preventDefault();
//     const { login, email, password } = this.state;
//     console.log(`Login: ${login}, Email: ${email}, Password: ${password}`);
//     this.props.onSubmit({ ...this.state });
//     this.reset();
//   };

//   reset = () => {
//     this.setState({ ...INITIAL_STATE });
//   };

//   render() {
//     const { login, email, password } = this.state;
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           Name
//           <input
//             type="text"
//             placeholder="Enter login"
//             name="login"
//             value={login}
//             onChange={this.handleChange}
//           />
//         </label>

//         <label>
//           Email
//           <input
//             type="email"
//             placeholder="Enter email"
//             name="email"
//             value={email}
//             onChange={this.handleChange}
//           />
//         </label>

//         <label>
//           Password
//           <input
//             type="password"
//             placeholder="Enter password"
//             name="password"
//             value={password}
//             onChange={this.handleChange}
//           />
//         </label>

//         <button type="submit">Sign up as {login}</button>
//       </form>
//     );
//   }
// }

// //! Генерація Id елементів форми
// /*
// * Доступність (accessibility, a11y) - дуже важлива тема в сучасному вебі. HTML-атрибут for тегу label допомагає асистивним технологіям та іншим допоміжним інструментам. В React він представлений jsx-атрибутом htmlFor.

// * Для генерації унікальних ідентифікаторів елементів форм використовується наступний підхід: для кожного екземпляра компонента, під час його ініціалізації, створюється набір унікальних ідентифікаторів, що зберігаються на екземплярі. Таким чином, між різними формами одержуємо унікальні id. */

// // Можна використовувати будь-який пакет для генерації унікальних рядків
// //! import { nanoid } from 'nanoid';

// export class Form extends Component {
//   loginInputId = nanoid();

//   render() {
//     return (
//       <form>
//         <label htmlFor={this.loginInputId}>Login</label>
//         <input type="text" name="login" id={this.loginInputId} />
//       </form>
//     );
//   }
// }

// //* тепер, коли в нас будуть повторюватися компоненти, id мід label та input буде однаковий, а мій компонентами <Form/> і <Form/> будуть різні.

// //! Чекбокси
// /*
//  * Робота з чекбоксами - проста та зрозуміла. Чекбокс може бути всього у 2-х станах: true або false.

// Особливості чекбоксів:
// * Ім'я атрибута, якому передається поточне значення зі state. Для чекбоксів - це checked, і передаємо туди буль.
// * Під час обробки події onChange, для отримання значення, в об'єкті події звертаємось до властивості event.target.checked
// * Якщо чекбокс повинен зберігати значення, його можна повісити на атрибут value і прочитати з об'єкта події */

// //* Додамо до нашої форми реєстрації чекбокс для підтвердження згоди користувача, і зробимо кнопку сабміту неактивною, доки неактивний чекбокс.
// const INITIAL_STATE = {
//   login: '',
//   email: '',
//   password: '',
//   agreed: false,
// };

// class SignUpForm extends React.Component {
//   state = {
//     ...INITIAL_STATE,
//   };

//   handleChange = evt => {
//     const { name, value, type, checked } = evt.target;
//     // Якщо тип елемента - checkbox, беремо значення checked,
//     // в іншому випадку - value
//     this.setState({ [name]: type === 'checkbox' ? checked : value });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     const { login, email, password, agreed } = this.state;

//     console.log(
//       `Login: ${login}, Email: ${email}, Password: ${password}, Agreed: ${agreed}`
//     );
//   };

//   render() {
//     const { login, email, password, agreed } = this.state;

//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           Agree to terms
//           <input
//             type="checkbox"
//             checked={agreed}
//             onChange={this.handleChange}
//           />
//         </label>

//         <button type="submit" disabled={!agreed}>
//           Sign up as {login}
//         </button>
//       </form>
//     );
//   }
// }

// //! Радіокнопки
// /*
// * На відміну від звичного групування за значенням атрибуту name, в React радіокнопка - це лише елемент інтерфейсу, який:

// * Знає, чи він вибраний
// * Може попросити форму змінити виділення */

// //* Зазвичай у радіокнопок є і атрибут checked і value. Наприклад, радіокнопка, що відповідає за вибір статі користувача.
// <input
//   type="radio"
//   checked={this.state.gender === 'male'}
//   value="male"
//   onChange={this.handleGenderChange}
// />;

// //Додамо групу радіокнопок у нашу форму.

// // Використовуємо Enumerable, щоб не створювати антипатерн "магічні рядки"
// const Gender = {
//   MALE: 'male',
//   FEMALE: 'female',
// };

// const INITIAL_STATE = {
//   login: '',
//   email: '',
//   password: '',
//   agreed: false,
//   gender: null,
// };

// class SignUpForm extends Component {
//   state = {
//     ...INITIAL_STATE,
//   };

//   render() {
//     const { login, email, password, agreed, gender } = this.state;
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <section>
//           <h2>Choose your gender</h2>
//           <label>
//             Male
//             <input
//               type="radio"
//               checked={gender === Gender.MALE}
//               name="gender"
//               value={Gender.MALE}
//               onChange={this.handleChange}
//             />
//           </label>
//           <label>
//             Female
//             <input
//               type="radio"
//               checked={gender === Gender.FEMALE}
//               name="gender"
//               value={Gender.FEMALE}
//               onChange={this.handleChange}
//             />
//           </label>
//         </section>

//         <button type="submit" disabled={!agreed}>
//           Sign up as {login}
//         </button>
//       </form>
//     );
//   }
// }

// //! Селект
// //* Все просто - є селект, є опції, у селекта є value та onChange. Додаємо вибір вікової категорії.

// const INITIAL_STATE = {
//   login: '',
//   email: '',
//   password: '',
//   agreed: false,
//   gender: null,
//   age: '',
// };

// class SignUpForm extends Component {
//   state = {
//     ...INITIAL_STATE,
//   };

//   /* ... */
//   render() {
//     const { login, email, password, agreed, gender, age } = this.state;

//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           Choose your age
//           <select name="age" value={age} onChange={this.handleChange}>
//             <option value="" disabled>
//               ...
//             </option>

//             <option value="18-25">18-25</option>
//             <option value="18-25">26-35</option>
//             <option value="18-25">36+</option>
//           </select>
//         </label>

//         <button type="submit" disabled={!agreed}>
//           Sign up as {login}
//         </button>
//       </form>
//     );
//   }
// }
