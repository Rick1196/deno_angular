interface IPerson {
  _id: any;
  nombre: String;
  edad: Number;
  sexo: String;
  codigo: string;
}

export class Person {
    _id:any;
  nombre: String;
  edad: Number;
  sexo: String;
  codigo: string;
  public constructor(...args: Array<any>){
    if(args.length == 0)
        throw new Error('Arguments are not defined.');
    if(args.length == 2){
        this.nombre = args[0];
        this.edad = args[1];
        this.sexo = "";
        this.codigo = this.generateCode();
    }
    if(args.length == 3){
        this.nombre = args[0];
        this.nombre = args[1];
        this.sexo = args[3];
        this.codigo = this.generateCode();
    }
    if(args.length > 4){
        this._id = args[0];
        this.nombre = args[1];
        this.nombre = args[2];
        this.sexo = args[3];
        this.codigo = this.generateCode();
    }
  }

  public generateCode(): string {
    return Math.random().toString(36).substring(2, 10) +
      Math.random().toString(36).substring(2, 10).toUpperCase();
  }
}
