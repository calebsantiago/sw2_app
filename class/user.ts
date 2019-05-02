import nodemailer from 'nodemailer';

export abstract class User {
    username : string;
    password : string;
    image :  string;
    account : string;
    firstname : string;
    lastname : string;
    gender : string;
    birthdate : string;
    phonenumber : number;
    email : string;
    address :  string;
    coordinate : [number, number];
    constructor(username : string, password : string, image : string, account : string, firstname : string, lastname : string, gender : string, birthdate : string, phonenumber : number, email : string, address :  string, latitude : number, longitude : number) {
        this.username = username;
        this.password = password;
        this.image = image;
        this.account = account;
        this.firstname = firstname;
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
  public getImage() : string {
		return this.image;
	}
	public setImage(image : string) : void {
		this.image = image;
	}
    public getAccount() : string {
		return this.account;
	}
	public setAccount(account : string) : void{
		this.account = account;
  }
  public getFirstname() : string {
		return this.firstname;
	}
	public setFirstname(firstname : string) : void{
		this.firstname = firstname;
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
  public abstract createAccount() : void
  public abstract validateAccount(username : string, password : string) : void
  public abstract updateAccount(id : string) : void
  public abstract deleteAccount(id : string) : void
  public sendMail() : void {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'contactaulima@gmail.com',
          pass: 'ulimasw2'
      }
    });
    let mailOptions = {
        from: 'contactaulima@gmail.com',
        to: this.getEmail(),
        subject: 'Asunto',
        text: 'Hola ' + this.getUsername()
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: '+ info.response);
        }
    });
  }
  public logIn() : void {
    console.log('log in');

  }
  public logOut() : void {
    console.log('log out');
  }
}