// Minimal declaration for bcryptjs to satisfy TypeScript in this project.
// For stricter types, consider installing @types/bcryptjs or adding full typings.
declare module 'bcryptjs' {
  const bcrypt: any;
  export = bcrypt;
}
