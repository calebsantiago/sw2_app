export class User {
    username : string;
    password : string;
    account : string;
    name : string;
    lastname : string;
    gender : string;
    birthdate : string;
    phonenumber : number;
    email : string;
    address :  string;
    coordinate : [number, number];
    constructor(username : string, password : string, account : string, name : string, lastname : string, gender : string, birthdate : string, phonenumber : number, email : string, address :  string, latitude : number, longitude : number) {
        this.username = username;
        this.password = password;
        this.account = account;
        this.name = name;
        this.lastname = lastname;
        this.gender = gender;
        this.birthdate = birthdate;
        this.phonenumber = phonenumber;
        this.email = email;
        this.address = address;
        this.coordinate = [latitude, longitude];
    }
    public getUsername() : string {
		return this.username;
	}
	public setUserName(username : string) : void {
		this.username = username;
	}
	public getPassword() : string {
		return this.password;
	}
	public setPassword(password : string) : void{
		this.password = password;
    }
    public getAccount() : string {
		return this.account;
	}
	public setAccount(account : string) : void{
		this.account = account;
    }
    public getName() : string {
		return this.name;
	}
	public setName(name : string) : void{
		this.name = name;
    }
    public getLastname() : string {
		return this.lastname;
	}
	public setLastname(lastname : string) : void{
		this.lastname = lastname;
    }
    public getGender() : string {
		return this.gender;
	}
	public setGender(gender : string) : void {
		this.gender = gender;
    }
    public getBirthdate() : string {
		return this.birthdate;
	}
	public setBirthdate(birthdate : string) : void {
		this.birthdate = birthdate;
    }
    public getPhonenumber() : number {
		return this.phonenumber;
	}
	public setPhonenumber(phonenumber : number) : void{
		this.phonenumber = phonenumber;
    }
	public getEmail() : string {
		return this.email;
	}
	public setEmail(email : string) : void {
		this.email = email;
    }
    public getAddres() : string {
		return this.address;
	}
	public setAddress(address : string) : void {
		this.address = address;
    }
    public getCoordinate() : number[] {
		return this.coordinate;
	}
	public setCoordinate(latitude : number, longitude : number) : void {
		this.coordinate = [latitude, longitude];
    }
    public createAccount() : void {
        console.log('create account');
    }
    public updateAccount() : void {
        console.log('update account');
    }
    public deleteAccount() : void {
        console.log('delete account');
    }
    public logIn() : void {
        console.log('log in');
    }
    public logOut() : void {
        console.log('log out');
    }
}