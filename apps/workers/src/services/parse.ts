require("dotenv").config();


export const parse = (commentBody : string | undefined) => {
    // Add double quotes around property names
    const validJsonStr = commentBody?.replace(/([a-zA-Z0-9_]+):/g, '"$1":');
    
    // Now parse the string into an object
    const obj = JSON.parse(validJsonStr || '{}');
    
    // console.log(obj);
    return obj;
}