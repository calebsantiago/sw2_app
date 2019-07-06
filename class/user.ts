import nodemailer from 'nodemailer';
export abstract class User {
  firstname : string;
  lastname : string;
  gender : string;
  birthdate : string;
  phonenumber : number;
  email : string;
  password : string;
  confirm_password : string;
  image :  string;
  account : string;
  address :  string;
  coordinate : [number, number];
  constructor(firstname : string, lastname : string, gender : string, birthdate : string, phonenumber : number, email : string, password : string, confirm_password : string, image : string, account : string,  address :  string, latitude : number, longitude : number) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.gender = gender;
    this.birthdate = birthdate;
    this.phonenumber = phonenumber;
    this.email = email;
    this.password = password;
    this.confirm_password = confirm_password;
    this.image = image;
    this.account = account;
    this.address = address;
    this.coordinate = [latitude, longitude];
  }
  public getFirstname() : string {
		return this.firstname;
	}
	public setFirstname(firstname : string) : void {
		this.firstname = firstname;
  }
  public getLastname() : string {
		return this.lastname;
	}
	public setLastname(lastname : string) : void {
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
	public getPassword() : string {
		return this.password;
	}
	public setPassword(password : string) : void {
		this.password = password;
  }
  public getConfirm_password() : string {
		return this.confirm_password;
	}
	public setConfirm_password(confirm_password : string) : void {
		this.confirm_password = confirm_password;
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
	public setAccount(account : string) : void {
		this.account = account;
  }
  public getAddress() : string {
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
  public sendMail() : void {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'contacta.no.reply@gmail.com',
          pass: 'contactasw2ulima'
      }
    });
    let mailOptions = {
        from: 'contacta.no.reply@gmail.com',
        to: this.getEmail(),
        subject: 'Contacta',
        text: 'Hola ' + this.getFirstname() + ' ' + this.getLastname() + ' te damos la bienvenida a Contacta.'
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
  public abstract logIn(email : string) : any
  public logOut() : void {
    console.log('log out');
  }
  public abstract updateAccount(id : string) : void
  public abstract deleteAccount(id : string) : void
}