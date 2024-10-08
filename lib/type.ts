export interface User {
    _id:string;
    name: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    nidNumber: string;
    region: string;
    city: string;
    village: string;
    bloodGroup: string;
    studyDepartment: string;
    semester: string;
    numberOfTimes: string;
    availableDonar:string;
    policeStation:string;
    id:string;
    
  }

  export interface AdminUser {
    _id: string;
    fullName: string;
    email: string;
    isAdmin: boolean;
  }
  