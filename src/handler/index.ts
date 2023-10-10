export const handler = () => {
    console.log('Hello from something else!')
    return {
        statusCode: 200,
        body: {
            res: 'Hello from lambda!'
        }
    }
};

export default handler;