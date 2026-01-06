
import { StreamVideoClient } from "@stream-io/video-react-sdk";

const apiKey = import.meta.env.VITE_STREAM_API_KEY;

let client = null;

export const initializeStreamClient = async (user, token) => {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/b5b9e332-cddf-40ee-9b81-a1a5ef146501',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'stream.js:11',message:'Initializing Stream client',data:{hasApiKey:!!apiKey,apiKeyLength:apiKey?.length||0,hasUser:!!user,hasToken:!!token,userId:user?.id},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
  // #endregion
  
  // if client exists with same user instead of creating again return it

  if (client && client?.user?.id === user.id) return client;

  if (client) {
    await disconnectStreamClient();
  }

  if (!apiKey) {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/b5b9e332-cddf-40ee-9b81-a1a5ef146501',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'stream.js:22',message:'ERROR: Stream API key missing',data:{error:'VITE_STREAM_API_KEY not provided'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
    // #endregion
    throw new Error("Stream API key is not provided.");
  }

  try {
    client = new StreamVideoClient({
      apiKey,
      user,
      token,
    });
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/b5b9e332-cddf-40ee-9b81-a1a5ef146501',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'stream.js:32',message:'Stream client created successfully',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
    // #endregion
  } catch (error) {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/b5b9e332-cddf-40ee-9b81-a1a5ef146501',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'stream.js:36',message:'ERROR: Failed to create Stream client',data:{error:error.message,errorStack:error.stack},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
    // #endregion
    throw error;
  }

  return client;
};

export const disconnectStreamClient = async () => {
  if (client) {
    try {
      await client.disconnectUser();
      client = null;
    } catch (error) {
      console.error("Error disconnecting Stream client:", error);
    }
  }
};
