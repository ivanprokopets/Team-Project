import React from 'react';
import s from './index.module.css';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
export const InputText = ({ input, meta, ...props }:any) => {
  const hasError = meta.touched && meta.error;
  return (
    <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
      <Form.Control {...input} type="text" placeholder={props.placeholder} />
      {hasError && (
        <span className={s.blockPrintError}>
          <div className={s.printError}>{meta.error}</div>
        </span>
      )}
    </div>
  );
};

// export const TextArea = ({ input, meta, ...props }) => {
//   const hasError = meta.touched && meta.error;
//   const hasWarning = meta.warning;
//   return (
//     <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
//       {hasWarning && (
//         <span className={s.blockPrintWarning}>
//           <div className={s.printWaring}>{meta.warning}</div>
//         </span>
//       )}

//       <Form.Control as="textarea" {...input} rows="3" placeholder={props.placeholder} />
//       {hasError && (
//         <span className={s.blockPrintError}>
//           <div className={s.printError}>{meta.error}</div>
//         </span>
//       )}
//     </div>
//   );
// };

// export const InputFile = ({ input, meta, ...props }) => {
//   const hasError = meta.touched && meta.error;
//   const hasWarning = meta.warning;
//   return (
//     <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
//       {hasWarning && (
//         <span className={s.blockPrintWarning}>
//           <div className={s.printWaring}>{meta.warning}</div>
//         </span>
//       )}
//       <div className="input-group">
//         <div className="input-group-prepend">
//           <span className="input-group-text" id="inputGroupFileAddon01">
//             Upload
//           </span>
//         </div>
//         <div className="custom-file">
//           <input
//             type="file"
//             {...input}
//             className="custom-file-input"
//             id="inputGroupFile01"
//             aria-describedby="inputGroupFileAddon01"
//           />
//           <label className="custom-file-label" htmlFor="inputGroupFile01">
//             {props.label}
//           </label>
//         </div>
//       </div>
//       {hasError && (
//         <span className={s.blockPrintError}>
//           <div className={s.printError}>{meta.error}</div>
//         </span>
//       )}
//     </div>
//   );
// };

export const InputEmail = ({ input, meta, ...props }:any) => {
  const hasError = meta.touched && meta.error;
  return (
    <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          {...input}
          type={props.type}
          placeholder={props.placeholder}
          aria-label="email"
          aria-describedby="basic-addon1"
          // required
          className="form-control"
        />
      </InputGroup>

      {hasError && (
        <span className={s.blockPrintError}>
          <div className={s.printError}>{meta.error}</div>
        </span>
      )}
    </div>
  );
};

export const InputPassword = ({ input, meta, ...props }:any) => {
  const hasError = meta.touched && meta.error;
  const hasWarning = meta.warning;
  return (
    <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
      {hasWarning && (
        <span className={s.blockPrintWarning}>
          <div className={s.printWaring}>{meta.warning}</div>
        </span>
      )}
      <Form.Control {...input} type="password" placeholder={props.placeholder} />
      {hasError && (
        <span className={s.blockPrintError}>
          <div className={s.printError}>{meta.error}</div>
        </span>
      )}
    </div>
  );
};
