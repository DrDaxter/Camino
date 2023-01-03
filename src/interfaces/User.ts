export interface User {
    additionalUserInfo: AdditionalUserInfo;
    user:               UserClass;
}

export interface AdditionalUserInfo {
    isNewUser:  boolean;
    profile:    Profile;
    providerId: string;
}

export interface Profile {
    aud:            string;
    azp:            string;
    email:          string;
    email_verified: boolean;
    exp:            number;
    family_name:    string;
    given_name:     string;
    iat:            number;
    iss:            string;
    locale:         string;
    name:           string;
    picture:        string;
    sub:            string;
}

export interface UserClass {
    displayName:   string;
    email:         string;
    emailVerified: boolean;
    isAnonymous:   boolean;
    metadata:      string[];
    multiFactor:   string[];
    phoneNumber:   null;
    photoURL:      string;
    providerData:  string[];
    providerId:    string;
    tenantId:      null;
    uid:           string;
}
