type CSSModuleClasses = { readonly [key: string]: string }

declare module '*.css'
declare module '*.less'
declare module '*.module.css' {
  const classes: CSSModuleClasses
  export default classes
}
declare module '*.module.less' {
  const classes: CSSModuleClasses
  export default classes
}
declare module '*.png'
declare module '*.gif'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'

interface Window {}
