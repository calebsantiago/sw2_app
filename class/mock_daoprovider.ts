import { ProviderAdapter, Provider } from "./daoprovider";

export class MockProviderAdapter extends ProviderAdapter{

    static INSTANCE : MockProviderAdapter | null

    providers : Provider[] = []

    private constructor(){
        super()
    }

    static getInstance()
    {
        if (MockProviderAdapter.INSTANCE == null)
        {
            MockProviderAdapter.INSTANCE = new MockProviderAdapter()            
        }
        return MockProviderAdapter.INSTANCE
    }
    getIdcard(): number | undefined {
        for(let i = 0 ; i < this.providers.length;i++){
            return this.providers[i].idcard
        }
    }
    setIdcard(idcard: number): void {
        throw new Error("Method not implemented.");
    }
    getVideo(): string | undefined {
        throw new Error("Method not implemented.");
    }
    setvideo(video: string): void {
        throw new Error("Method not implemented.");
    }
    getDescription(): string | undefined {
        throw new Error("Method not implemented.");
    }
    setDescription(description: string): void {
        throw new Error("Method not implemented.");
    }
    getCertificate(): string | undefined {
        throw new Error("Method not implemented.");
    }
    setCertificate(certificate: string): void {
        throw new Error("Method not implemented.");
    }
    getService(): string[] | undefined {
        throw new Error("Method not implemented.");
    }
    setService(service: string, newService: string): void {
        throw new Error("Method not implemented.");
    }
    validateSignUp(): any[] {
        throw new Error("Method not implemented.");
    }
    createAccount(): void {
        throw new Error("Method not implemented.");
    }
    logIn(email: string) {
        throw new Error("Method not implemented.");
    }
    updateAccount(id: string): void {
        throw new Error("Method not implemented.");
    }
    deleteAccount(id: string): void {
        throw new Error("Method not implemented.");
    }
    addService(service: string): void {
        throw new Error("Method not implemented.");
    }
    deleteService(service: string): void {
        throw new Error("Method not implemented.");
    }
    checkQuotations(): void {
        throw new Error("Method not implemented.");
    }
    quoteService(): void {
        throw new Error("Method not implemented.");
    }
    responseService(): void {
        throw new Error("Method not implemented.");
    }
    changeStatus(): void {
        throw new Error("Method not implemented.");
    }
    checkHistory(): void {
        throw new Error("Method not implemented.");
    }
    getFirstname(): string | undefined {
        throw new Error("Method not implemented.");
    }
    setFirstname(firstname: string): void {
        throw new Error("Method not implemented.");
    }
    getLastname(): string | undefined {
        throw new Error("Method not implemented.");
    }
    setLastname(lastname: string): void {
        throw new Error("Method not implemented.");
    }
    getGender(): string | undefined {
        throw new Error("Method not implemented.");
    }
    setGender(gender: string): void {
        throw new Error("Method not implemented.");
    }
    getBirthdate(): string | undefined {
        throw new Error("Method not implemented.");
    }
    setBirthdate(birthdate: string): void {
        throw new Error("Method not implemented.");
    }
    getPhonenumber(): number | undefined {
        throw new Error("Method not implemented.");
    }
    setPhonenumber(phonenumber: number): void {
        throw new Error("Method not implemented.");
    }
    getEmail(): string | undefined {
        throw new Error("Method not implemented.");
    }
    setEmail(email: string): void {
        throw new Error("Method not implemented.");
    }
    getPassword(): string | undefined {
        throw new Error("Method not implemented.");
    }
    setPassword(password: string): void {
        throw new Error("Method not implemented.");
    }
    getConfirm_password(): string | undefined {
        throw new Error("Method not implemented.");
    }
    setConfirm_password(confirm_password: string): void {
        throw new Error("Method not implemented.");
    }
    getImage(): string | undefined {
        throw new Error("Method not implemented.");
    }
    setImage(image: string): void {
        throw new Error("Method not implemented.");
    }
    geAccount(): string | undefined {
        throw new Error("Method not implemented.");
    }
    setAccount(account: string): void {
        throw new Error("Method not implemented.");
    }
    getAddress(): string | undefined {
        throw new Error("Method not implemented.");
    }
    setAddress(address: string): void {
        throw new Error("Method not implemented.");
    }
    getCoordinate(): number[] | undefined {
        throw new Error("Method not implemented.");
    }
    setCoordinate(latitude: number, longitude: number): void {
        throw new Error("Method not implemented.");
    }
    getAge(birthdate: string): number {
        throw new Error("Method not implemented.");
    }
    validateLogin(email: string, password: string): any[] {
        throw new Error("Method not implemented.");
    }
    anotherAccount(): import("mongoose").DocumentQuery<any, any, {}>[] | undefined {
        throw new Error("Method not implemented.");
    }
    senMail(): void {
        throw new Error("Method not implemented.");
    }
    logOut(): void {
        throw new Error("Method not implemented.");
    }  
}