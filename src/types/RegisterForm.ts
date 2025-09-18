export type RegisterForm = {
    name: string;
    mobile_phone: string;
    date_of_birth: string;
    email: string;
    courses: {
        order: number;
        course: string;
    }[];
    city: string;
};
