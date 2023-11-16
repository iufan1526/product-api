class SuccessResult {
    static successCreate(data, message) {
        return {
            success: true,
            message,
            data,
        };
    }

    static successLogin(token) {
        return {
            success: true,
            message: '로그인이 완료되었습니다.',
            token,
        };
    }

    static successUser(data) {
        return {
            success: true,
            message: '사용자 조회가 완료되었습니다.',
            data,
        };
    }
}

export default SuccessResult;
