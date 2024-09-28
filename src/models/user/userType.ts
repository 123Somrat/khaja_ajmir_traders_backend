type TUser = {
      name:string,
      email:string,
      password:string,
      role?:string
      confirmPassword?:string,
      faildLoginAttempts?:number,
      lockUntil?: Date
}


export default TUser