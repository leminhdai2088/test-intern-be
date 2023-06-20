import bcrypt from 'bcrypt';
const isCheckedPassword = async (password, passwordInDb) => {
    try {
        return await bcrypt.compare(password, passwordInDb);
    } catch (error) {
        console.log(error);
    }
};

export { isCheckedPassword };
