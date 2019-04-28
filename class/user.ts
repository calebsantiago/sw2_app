interface User_Interface {
    name : string;
    password : string;
    email : string;
    getName() : string;
    setName(name : string) : void;
    getPassword() : string;
    setPassword(password : string) : void;
    getEmail() : string;
    setEmail(email : string) : void;
}

export class User implements User_Interface {
    name : string;
    password : string;
    email : string;
    constructor(name : string, password : string, email : string){
        this.name = name;
        this.password = password;
        this.email = email;
    }
    public getName() : string {
		return this.name;
	}
	public setName(name : string) : void {
		this.name = name;
	}
	public getPassword() : string {
		return this.password;
	}
	public setPassword(password : string) : void{
		this.password = password;
	}
	public getEmail() : string {
		return this.email;
	}
	public setEmail(email : string) : void {
		this.email = email;
	}
}