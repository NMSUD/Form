import{r as h}from"./index-7784a98a.js";import{u as d}from"./index-8c670669.js";import{M as u}from"./index-f135ce8b.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-d00c6174.js";import"../sb-preview/runtime.js";import"./index-8c3ac41d.js";import"./index-305bc513.js";import"./index-356e4a49.js";var c={exports:{}},s={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var x=h,f=Symbol.for("react.element"),j=Symbol.for("react.fragment"),y=Object.prototype.hasOwnProperty,g=x.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,_={key:!0,ref:!0,__self:!0,__source:!0};function m(r,e,l){var t,o={},i=null,p=null;l!==void 0&&(i=""+l),e.key!==void 0&&(i=""+e.key),e.ref!==void 0&&(p=e.ref);for(t in e)y.call(e,t)&&!_.hasOwnProperty(t)&&(o[t]=e[t]);if(r&&r.defaultProps)for(t in e=r.defaultProps,e)o[t]===void 0&&(o[t]=e[t]);return{$$typeof:f,type:r,key:i,ref:p,props:o,_owner:g.current}}s.Fragment=j;s.jsx=m;s.jsxs=m;c.exports=s;var n=c.exports;function a(r){const e={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...d(),...r.components};return n.jsxs(n.Fragment,{children:[n.jsx(u,{title:"Form/General"}),`
`,n.jsx(e.h1,{id:"form-components",children:"Form components"}),`
`,n.jsxs(e.p,{children:["These components are used in the ",n.jsx(e.code,{children:"formBuilder.tsx"})," to render easy to use components for users to enter data with validation. A form component has a few requirements in order to work in the forms, they should make use of the ",n.jsx(e.code,{children:"FormInputProps<T>"})," interface where T is the type of the property. For example a text input form component would have props of type ",n.jsx(e.code,{children:"FormInputProps<string>"}),"."]}),`
`,n.jsx("br",{}),`
`,n.jsx(e.h2,{id:"table-of-contents",children:"Table of Contents"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"#forminput",children:"FormInput"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"#extending-forminput",children:"Extending FormInput"})}),`
`]}),`
`,n.jsx("br",{}),`
`,n.jsx(e.h2,{id:"forminput",children:"FormInput"}),`
`,n.jsxs(e.p,{children:["Below is what the ",n.jsx(e.code,{children:"FormInputProps"})," looks like (at the time of writing, this will likely fall out of date quickly 😅)."]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-ts",children:`export type FormInputProps<T> = {
  id: string;
  label: string;
  helpText?: string;
  value: T;
  placeholder: string;
  showValidationMessages: boolean;
  validation: (val: T) => ValidationResult;
  onChange: (newValue: T) => void;
};
`})}),`
`,n.jsx(e.p,{children:"You can see some basics, such as a value property and an onChange function."}),`
`,n.jsx("br",{}),`
`,n.jsx(e.h2,{id:"extending-forminput",children:"Extending FormInput"}),`
`,n.jsx(e.p,{children:"If there are additional properties that your component needs, you can specify them like this:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-ts",children:`interface IFormLongInputProps extends FormInputProps<string> {
  inputType?: string;
  disabled?: boolean;
}
`})})]})}function R(r={}){const{wrapper:e}={...d(),...r.components};return e?n.jsx(e,{...r,children:n.jsx(a,{...r})}):a(r)}export{R as default};
