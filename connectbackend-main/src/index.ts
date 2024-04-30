import {Hono} from 'hono'
import { cors } from 'hono/cors';
import { D1Database, D1Result } from 'hono';


type Post ={
   post_id:number;
   user_id:string;
   post_title:string;
   post_description:string;
}

// type PostDetails={
//    post_title:string
//    post_description:string
// }

type user = {
  user_id:string;
  college_id:string;
  user_name:string;
  role:string;
  year_of_student:string;
  description:string;
  created_date:string;
  updated_date:string;
}

type group ={
  group_id:string;
  group_name:string;
  created_by:string;
  member:string;
  description:string;

}

type login ={
  user_id:string;
  password:string;
}

type signup ={
  user_id:string;
  user_name:string;
  password:string;
}

type college ={
  college_id:string;
  college_name:string;
  college_place:string;
  created_date:string;
}

type request ={
  request_id:number;
  sender_id:string;
  receiver_id:string;
  is_status:string;
  message:string;
  created_at:string;
  updated_at:string;
}


type chat ={
  chat_id:number;
  sender_id:string;
  receiver_id:string;
  message:string;
}


type Bindings={
  DB: D1Database
  CONNECTIMG:KVNamespace;
}

const app = new Hono<{Bindings:Bindings}>()

app.use('*', async (c, next) => {

  // CORS middleware configuration
  const corsMiddleware = cors({
    origin: 'http://localhost:5173',
    allowHeaders: ['Origin', 'Content-Type', 'Authorization'],
    allowMethods: ['GET', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })

  // Apply CORS middleware to all routes to allow cross-origin requests
  return await corsMiddleware(c, next)
})

//updated code

// app.post('/upload', async (c) => {

//   try {
//     const formData = await c.req.formData();

//     const fileData = formData.get('image') as unknown as File;
//     if (!fileData) {
//       return c.json({ error: 'No file provided' }, 400);
//     }
  
//     const fileBlob = new File([await fileData.arrayBuffer()], fileData.name, {
//       type: fileData.type,
//     });
//     const key = `${new Date().getTime()}-${fileBlob.name}`;
//     const fileBuffer = await fileBlob.arrayBuffer();
  
//     try {
//       if (c.env && c.env.CONNECTIMG) {
//         await c.env.CONNECTIMG.put(key, fileBuffer);
//         return c.json({ url: `https://<YOUR_WORKER_DOMAIN>/.well-known/kv/${key} `});
//       } else {
//         throw new Error('KV namespace is not available');
//       }
//     } catch (error:any) {
//       return c.json({ error: error.message }, 500);
//     }
    
//   } catch (error:any) {
//     return c.json({ error: error.message }, 500);
//   }

    
//   }
 
// )




  //SIGNUP REQUEST
  app.post('/signup', async (c) => {
    try {
        const { user_id, user_name, password, college_id, role, year_of_student } = await c.req.json();
        
        // Check if any required field is empty
        if (user_id === '' || user_name === '' || password === '' || college_id === '' || role === '' || year_of_student === '') {
            return c.json({ username: '', isCorrectPassword: 0, message: 'Please fill out all required fields' });
        }

        const existingUser = await c.env.DB.prepare(`SELECT * FROM signup WHERE user_id = ? OR user_name = ?`).bind(user_id, user_name).all() as unknown as Array<any>;

        if (existingUser.length > 0) {
            return c.json({ username: '', isCorrectPassword: 0, message: 'User already exists' });
        } else {
            // Insert the new user into the database
            await c.env.DB.prepare(`INSERT INTO signup(user_id, user_name, password) VALUES (?, ?, ?)`).bind(user_id, user_name, password).all();
            await c.env.DB.prepare(`INSERT INTO User(user_id, user_name, college_id, role, year_of_student) VALUES (?, ?, ?, ?, ?)`).bind(user_id, user_name, college_id, role, year_of_student).all();
            return c.json({ username: user_id, isCorrectPassword: 1, message: 'Signup successful' });
        }
    } catch (error: any) {
        return c.json(error.message);
        //return c.json({ username: '', isCorrectPassword: 0, message: 'Please enter valid credentials' });
    }
});



//for deleting the signuped user from the signup table
app.delete('/signup/delete/:id', async(c)=>{
    const Id = c.req.param('id');

    const {success} = await c.env.DB.prepare(`DELETE FROM signup where user_id=?`).bind(Id).all();

    if(success){
        return c.text("User deleted successfully")
    }
    else{
        return c.text("Something went wrong")
    }


})





  //LOGIN Page API for validating the username and password
  app.post('/login', async (c) => {
      const { user_name, password }: { user_name: string, password: string } = await c.req.json();
      if(user_name=="" || password==""){
        return c.json({  username: '', isCorrectPassword: 0, message: 'User not found'});
      }
else{
      const response = await c.env.DB.prepare(
        'SELECT * FROM signup WHERE user_name = ?'
      ).bind(user_name).all();

      const college_id= await c.env.DB.prepare(`select college_id from User Where user_name = ?`).bind(user_name).all();
  
      console.log('Response:', response);

      const name = await c.env.DB.prepare(`select user_id from signup where user_name =? `).bind(user_name).all();
      const signup = response.results &&  response.results[0] ;
  
      if (!signup) {
        return c.json({ username: '', isCorrectPassword: 0, message: 'User not found' });
      }

  
      const isCorrectPassword = signup.password === password ? 1 : 0;
      const message = isCorrectPassword ? 'Login Successfully' : 'Please enter correct credentials';
      return c.json({ username: name, isCorrectPassword, college_id});
    }
  });








  //COLLEGE REQUEST FOR passing the college Api's

  //posting the college by all
  app.post('/college/post/all',async (c) => {
    const {college_id,college_name,college_place,created_date} = await c.req.json();

    
    const{success} = await c.env.DB.prepare(`INSERT INTO college(college_id, college_name, college_place, created_date) VALUES(?,?,?,?)`).bind(college_id,college_name,college_place,created_date).run();
    
    if(success){
      return c.text("College created successfully")
    }
    else{
      return c.text("Something went wrong")
    }
    })


    //for getting the all college details from the college table
    app.get('/college/get/all',async(c)=>{
      const rows = await c.env.DB.prepare(`SELECT * FROM college`).all();
      return c.json(rows)
    })



    //for getting the unique college details by using the college_id  in the college table

    app.get('/college/get/:id',async(c)=>{
      const Id =  c.req.param('id');
    
      const details = await c.env.DB.prepare(`SELECT * FROM college WHERE college_id =?`).bind(Id).all();
      return c.json({details})
     
    })



    //for deleting the  college by college_id in the college table
    app.delete('/college/delete/:id',async (c) =>{
      const Id =  c.req.param('id');
    
      const{success} = await c.env.DB.prepare(`DELETE FROM college WHERE college_id =?`).bind(Id).run();
    
      if(success){
        return c.text("College deleted successfully")
      }
      else{
        return c.text("Something went wrong")
    }
    })



    //for updating the college by college_id in the college table

    app.put('/college/update/:id',async (c) =>{
      const Id =  c.req.param('id');
  
      const {college_id,college_name,college_place,created_date} = await c.req.json();
  
      const{success} = await c.env.DB.prepare(`UPDATE college SET college_name =?, college_place =?, created_date =? WHERE college_id =?`).bind(college_name,college_place,created_date,college_id).run();
  
      if(success){
        return c.text("College updated successfully")
      }
      else{
        return c.text("Something went wrong")
      }
    }
  )
  //COLLEGE REQUEST is over







  //USER REQUEST

  //for posting the user details by all credentials in the user_table
  app.post('/user/post/all',async (c) => {
    const {user_id,college_id,username,role,year_of_student,description,created_date,updated_date} = await c.req.json();
    
    const{success} = await c.env.DB.prepare(`INSERT INTO user(user_id,college_id, username, role,description, year_of_student, created_date, updated_date) VALUES(?,?,?,?,?,?,?,?)`).bind(user_id,college_id,username,role,description,year_of_student,created_date,updated_date).all();
    
    if(success){
      return c.text("User created successfully")
    }
    else{
      return c.text("Something went wrong")
    }
    })
    


    //for updating the user details by using user_id 
    app.put('/user/update/:id',async (c) =>{
    
      const Id =  c.req.param('id');
    
      const {user_id,college_id,username,role,description,year_of_student,created_date,updated_date} = await c.req.json();
    
      const{success} = await c.env.DB.prepare(`UPDATE user SET college_id =?, username =?, role =?,description=?, year_of_student =?, created_date =?, updated_date =? WHERE user_id =?`).bind(college_id,username,role,description,year_of_student,created_date,updated_date,user_id).run();
    
      if(success){
        return c.text("User updated successfully")
      }
      else{
        return c.text("Something went wrong")
      }
    }
    )
    


    //for getting the user by using user_id from the user table
    app.get('/user/get/:id',async(c)=>{
      const Id =  c.req.param('id');
    
      const details = await c.env.DB.prepare(`SELECT * FROM user WHERE user_id =?`).bind(Id).all();
        return c.json({details})
     })



     //for getting all users from the user table
    app.get('/user/getall',async(c)=>{
        const details  = await c.env.DB.prepare(`SELECT * FROM user`).all();
        return c.json(details)
    }
    )


    //for deleting the user by using user_id from the user table
    app.delete('/user/delete/:id',async (c) =>{
      const Id =  c.req.param('id');
    
      const{success} = await c.env.DB.prepare(`DELETE FROM user WHERE user_id =?`).bind(Id).run();
    
      if(success){
        return c.text("User deleted successfully")
      }
      else{
        return c.text("Something went wrong")
      }
    })
    //USER REQUEST is overed







  
   //POST REQUEST

  //  for posting the post details by all credentials in the post_table
  //   app.post('/post/all', async (c) => {
  //     const { user_id, post_title,post_description} =await c.req.json();

  //     if(user_id!='' || post_title!='' || post_description!='') {
  //     const{success} = await c.env.DB.prepare(`INSERT INTO post(user_id, post_title,post_description) VALUES(?,?,?)`).bind(user_id,post_title,post_description).run();
      
  //     if(success){
  //       return c.text("Post created successfully")
  //     }
  //     else{
  //       return c.text("Failed")
  //     }
  //   }
  //   else{
  //     return c.text("Please fill all the fields")
  //   }
  // });


  // Post that include the imagge user_id and post_title and post_description



// Post endpoint to store data
app.post('/post/all', async (c) => {
  try {
      const formData = await c.req.formData();

      const fileData = formData.get('image') as unknown as File;
      if (!fileData) {
          return c.json({ error: 'No file provided' }, 400);
      }
      
      const fileBlob = new File([await fileData.arrayBuffer()], fileData.name,{
          type: fileData.type,
      });
      const img_url = `${new Date().getTime()}-${fileBlob.name}`;
      const fileBuffer = await fileBlob.arrayBuffer();

      try {
          if (c.env && c.env.CONNECTIMG) {
              await c.env.CONNECTIMG.put(img_url, fileBuffer);
              const imageUrl = `https://connectapi.tharanitharan-n2022cse.workers.dev/.well-known/kv/${img_url}`;

              // Check if 'json' key exists in formData
              if (!formData.has('json')) {
                  return c.json({ error: 'No JSON data provided' }, 400);
              }

              // Parse JSON data from the form data
              const jsonData = formData.get('json');
              const { user_id, post_title, post_description } = JSON.parse(jsonData as string) as Post;

              if (user_id && post_title && post_description) {
                  const { success } = await c.env.DB.prepare(`INSERT INTO post(user_id, post_title, post_description, img_url) VALUES(?,?,?,?)`).bind(user_id, post_title, post_description, img_url).run();

                  if (success) {
                      return c.text("Post created successfully");
                  } else {
                      return c.text("Failed to create post");
                  }
              } else {
                  return c.text("Please provide user ID, post title, and post description");
              }
          } else {
              throw new Error('KV namespace is not available');
          }
      } catch (error:any) {
          return c.json({ error: error.message }, 500);
      }
  } catch (error:any) {
      return c.json({ error: error.message }, 500);
  }
});

// Get endpoint to retrieve all posts
app.get('/getpost/all', async (c) => {
  try {
      const db: D1Database = c.env.DB;
      const postsPromise = db.prepare('SELECT * FROM post').all();
      const postsResult = (await postsPromise) as D1Result<Record<string, unknown>>;
      const result: { [key: string]: any }[] = [];

      for await (const post of postsResult[Symbol.asyncIterator]()) {
          const imageUrl = `https://connectapi.tharanitharan-n2022cse.workers.dev/.well-known/kv/${post.img_url}`;
          result.push({
              ...post,
              img_url: imageUrl
          });
      }

      return c.json(result);
  } catch (error: any) {
      return c.json({ error: error.message }, 500);
  }
});





// Function to convert array buffer to base64




// app.get('/getpost/all', async (c) => {
//   try {
//       const stmt = await c.env.DB.prepare(`SELECT *, img_url FROM post`);
//       const posts = await stmt.all();

//       if (!Array.isArray(posts)) {
//           throw new Error("No posts found");
//       }

//       const result = [];

//       for (const post of posts) {
//           const imageUrl = `https://<YOUR_WORKER_DOMAIN>/.well-known/kv/${post.img_url}`;
//           const response = await fetch(imageUrl);
          
//           if (!response.ok) {
//               throw new Error("Failed to fetch image data");
//           }

//           const imageData = await response.arrayBuffer();
//           const base64Image = Buffer.from(imageData).toString('base64');
          
//           result.push({
//               ...post,
//               img_data: base64Image  // Add base64 image data to the result
//           });
//       }

//       return c.json(result);
//   } catch (error:any) {
//       return c.json({ error: error.message }, 500);
//   }
// });





  //for posting the post by using the user_id into the post table
    app.post('/post/:user_id',async(c)=>{
      try{
      const {post_title,post_description} = await c.req.json();

      const user_id =  c.req.param('user_id');

      if( post_title != '' || post_description != ''){

      const {success} = await c.env.DB.prepare(`INSERT INTO post (user_id,post_title,post_description) VALUES(?,?,?)`).bind(user_id,post_title,post_description).run();

        return c.json({ user_id: user_id, isPosted: 1, message: 'post created successfully' });
      }
    
    else{
      return c.json({ user_id: user_id, isPosted: 0, message: 'please Enter valid credentials' });
    }
  }
    catch(error:any){
      return c.text(error.message)
    }
    })
    

    //for getting the all the post from the post table
    // app.get('/getpost/all', async (c) => {
    //   const posts = await c.env.DB.prepare(`SELECT * FROM post`).all();
    //   return c.json(posts);
    // })  ;
    

    //for getting the post by using the user_id from the post table
    app.get('/getpost/:id', async (c) => {
      const id = c.req.param('id');
      const post = await c.env.DB.prepare(`SELECT * FROM post WHERE user_id = ?`).bind(id).all();
      return c.json({post});
    });


    //FETCHING POST FROM POST TABLE WITH USER_ID and college_id 
    app.get('/get/rel/:college_id', async (c) => {
      const college_id = c.req.param('college_id');
      const result = await c.env.DB.prepare(`
      SELECT post.post_id, post.user_id, post.post_title, post.post_description
      FROM user
      JOIN post ON user.user_id = post.user_id
      WHERE user.college_id = ?;
      `).bind(college_id).run();
      return c.json(result);
    });
    //POST REQUEST is overed










    //REQUEST TABLE API REQUEST
    
    //for posting the request details by all credentials in the request_table
    app.post('/request/post/all',async (c) => {
      const {sender_id,receiver_id,message} = await c.req.json();
    
      const{success} = await c.env.DB.prepare(`INSERT INTO request(sender_id,receiver_id,message) VALUES(?,?,?)`).bind(sender_id,receiver_id,message).run();
      
      if(success){
        return c.text("Request created successfully") 
      }
      else{
        return c.text("Something went wrong")
      }
    });


    //for updating the request in the request table by checking the is_status field in the request table
    app.put('update/request/:sender_id/:receiver_id', async (c) => {
      const { is_status } = await c.req.json();
      const sender_id = c.req.param('sender_id');
      const receiver_id = c.req.param('receiver_id');
    
      //console.log(`Updating is_status for sender_id=${sender_id} and receiver_id=${receiver_id} with value=${is_status}`);
    
      const sql = `UPDATE request SET is_status=? WHERE sender_id=? AND receiver_id=?`;
      const { success } = await c.env.DB.prepare(sql).bind(is_status, sender_id, receiver_id).run();

    
    
      if (success) {
        return c.text('updated successfully');
      } else {
        return c.text('update failed');
      }
    });


    //for getting the request by using the receiver_id from the request table
    app.get('/request/:receiver_id', async (c) => {
      try{
        const receiver_id: string = c.req.param('receiver_id');
    
        const stmt = await c.env.DB.prepare(
          `SELECT r.sender_id, u.user_name AS Sender_name, r.message
           FROM request r
           INNER JOIN user u ON r.sender_id = u.user_id
           WHERE r.receiver_id = ? AND r.is_status!='approved'AND r.is_status!='rejected'`
        );
        const boundStmt = stmt.bind(receiver_id);
    
        const requests = await boundStmt.all();
    
        return c.json(requests);
      }
      catch(error:any)
      {
        console.log(error);
        return c.text(error.message);
      }
        
      }
        );

    
//for  getting added the friends in the request table by using the same user_id is in the same_college then it will show 
  app.get('/addfriend2/:user_id/:college_id', async (c) => {
    try {
        const logged_in_user_id = c.req.param('user_id');
        const college_id = c.req.param('college_id');
        const query = await c.env.DB.prepare(`
        SELECT DISTINCT u.*
          FROM User u
          WHERE u.college_id = ?
          AND u.user_id != ?
          AND u.user_id NOT IN (
              SELECT sender_id FROM request WHERE receiver_id = ? AND is_status = 'approved'
              UNION
              SELECT receiver_id FROM request WHERE sender_id = ? AND is_status = 'approved'
          )
        
        `).bind(college_id, logged_in_user_id, logged_in_user_id, logged_in_user_id).all();
    
        return c.json({ query });
    } catch (error:any) {
        console.log(error);
        return c.text(error.message);
    }
});





    //FETCHING FRIENDS LIST from the user_table
    app.get('/getApprovedSender/:id/:college_id', async (c) => {
      const id = c.req.param('id');
      const college_id = c.req.param('college_id');
      try {
        const result = await c.env.DB.prepare(`
          SELECT DISTINCT User.user_name,User.user_id 
          FROM User 
          JOIN request ON User.user_id IN (request.sender_id, request.receiver_id)
          WHERE (request.sender_id = ? OR request.receiver_id = ?) 
          AND request.is_status = 'approved' AND college_id = ?
        `).bind(id, id,college_id).all();
        return c.json(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    });

    //creating the group table to post the overall details posted by the user
    app.post('/group/post/all', async (c) => {
      try {
        const { group_id, group_name, created_by, member} = await c.req.json();
           
        const { success } = await c.env.DB.prepare(`
          INSERT INTO \`group\` (group_id, group_name, created_by, member)
          VALUES (?, ?, ?, ?)
        `).bind(group_id, group_name, created_by, member).run();
    
        if (success) {
          return c.text("Group created successfully");
        } else {
          return c.text("Something went wrong");
        }
      } catch (error:any) {
        console.log(error);
        return c.text(error.message);
      }
    });


    //fetching the group details by who created the group 
    app.post('/group/:created_by',async(c)=>{
      const created_by = c.req.param('created_by');
      try{
        const {group_id,group_name,member} =await c.req.json()
        if(group_id == '' || group_name == '' || member == '' ){
          return c.json({isCreated:0,message:"please enter valid credentials"})
        }
           
        const { success } = await c.env.DB.prepare(`
          INSERT INTO \`group\` ( group_id, group_name,created_by, member)
          VALUES (?, ?, ?, ?)
        `).bind(group_id, group_name, created_by,member).run();
          return c.json({ user_id: created_by, isCreated: 1, message: 'Group created successfully' });
      } 
      catch (error:any) {
        console.log(error.message);
      }

    })


//this is for the posting in the group member table
  app.post('/group_members/:group_id/:user_id', async (c) => {

    try {
      const group_id = c.req.param('group_id');
      const member = c.req.param('user_id');
      

      
      // Fetch the created_by value from the group table
      const {results}= await c.env.DB.prepare(`SELECT group_name,created_by FROM \`group\` WHERE group_id = ?`).bind(group_id).all() ;
  
      // Extract the created_by value from the result
      const group_name = results[0].group_name;
      const created_by = results[0].created_by;
  
      const { success } = await c.env.DB.prepare(`INSERT INTO \`group\` (group_id, group_name, created_by, member) VALUES (?, ?, ?, ?)`).bind(group_id, group_name, created_by, member).run();
  
      if (success) {
        return c.text("Added group member successfully");
      } else {
        return c.text("Failed to add group member");
      }
    } catch (error: any) {
      console.log(error);
      return c.text(error.message);
    }
  });
  
  

    
      
//it will return the group details regrading with user given member_id and college_id and it will retreive the results
app.get('/getGroupsForUserAndCollege/:member_id/:college_id', async (c) => {
  const member_id = c.req.param('member_id');
  const college_id = c.req.param('college_id');

  try {
    const result = await c.env.DB.prepare(`
    SELECT *
FROM (
    SELECT *,
           ROW_NUMBER() OVER (PARTITION BY group_id ORDER BY created_by) as row_num
    FROM (
        SELECT *
        FROM "group"
        WHERE created_by IN (
            SELECT user_id
            FROM "User"
            WHERE college_id = ?
        )
        AND (
            created_by = (
                SELECT created_by
                FROM "group"
                WHERE member = ?
            )
            OR member = ?
        )
        UNION
        SELECT *
        FROM "group"
        WHERE created_by IN (
            SELECT user_id
            FROM "User"
            WHERE college_id = ?
        )
        AND created_by = (
            SELECT created_by
            FROM "group"
            WHERE member = ?
        )
    ) AS combined_groups
) AS grouped_results
WHERE row_num = 1;

    `).bind(college_id, member_id, member_id,college_id, member_id).all();

    return c.json(result);
  } catch (error:any) {
    return c.text(error);
  }
});



//fetching the members and college details from the table using the user_id not present in the group 
app.get('/getGroupsForUserAndnotcollege/:member_id/:college_id', async (c) => {
  const member_id = c.req.param('member_id');
  const college_id = c.req.param('college_id');

  try {
    const result = await c.env.DB.prepare(`
      SELECT *
      FROM "group" 
      WHERE created_by IN (
          SELECT user_id
          FROM "User"
          WHERE college_id = ?
      )
      AND created_by != (
          SELECT created_by
          FROM "group"
          WHERE member = ?
      )
      AND member != ? 
      AND group_id NOT IN ( 
          SELECT DISTINCT group_id
          FROM "group"
          WHERE member = ? AND created_by != ?
      )
    `).bind(college_id, member_id, member_id, member_id, member_id).all();

    return c.json(result);
  } catch (error) {
    console.error("Error fetching data:", error);
    return c.json({ success: false, message: "Internal server error." });
  }
});



//for posting the chat message in the chat table
  app.post('/chat/post', async (c) => {
    try {
        const {sender_id,receiver_id,message} = await c.req.json();
        if (sender_id == '' || receiver_id == '' || message.length === 0) {
            return c.json({ isCreated: 0, message: "please enter valid credentials" });
        }

        const { success } = await c.env.DB.prepare(`INSERT INTO chat (sender_id,receiver_id, message) VALUES (?, ?, ?)`)
            .bind(sender_id,receiver_id,message).all();
        
        if (success) {
            return c.text("Message added successfully");
        } else {
            return c.text("Message not added successfully");
        }
    } catch (error: any) {
        return c.json(error.message);
    }
});



//posting the chat message by using the sender_id and receiver_id
app.post('/chat/post/id/:sender_id/:receiver_id', async (c) => {
  try {
      const sender_id = c.req.param('sender_id');
      const receiver_id = c.req.param('receiver_id');
      const {message} = await c.req.json();
      if (sender_id == '' || receiver_id == '' || message.length === 0) {
          return c.json({ isCreated: 0, message: "please enter valid credentials" });
      }

      const { success } = await c.env.DB.prepare(`INSERT INTO chat (sender_id,receiver_id, message) VALUES (?, ?, ?)`)
          .bind(sender_id,receiver_id,message).all();
      
      if (success) {
          return c.text("Message added successfully");
      } else {
          return c.text("Message not added successfully");
      }
  } catch (error: any) {
      return c.json(error.message);
  }
});


// for updating the message that would be appended in the last
app.put('/chat/update/:user1/:user2/:chat_id', async (c) => {
  const user1 = c.req.param('user1');
  const user2 = c.req.param('user2');
  const chat_id = c.req.param('chat_id');

  try {
    // Get the new message from the request body
    const { message } = await c.req.json();

    // Fetch the existing message from the database
    const { results } = await c.env.DB.prepare(`SELECT message FROM chat WHERE user1 = ? AND user2 = ?`).bind(user1, user2).all();
    const existingMessageArray = results;  
    
    // Push the new message to the existing array
    existingMessageArray.push(message);

    // Convert the updated message array back to JSON string
    const updatedMessage = JSON.stringify(existingMessageArray, (_key, value) => {
      // Exclude backslashes from the stringification process
      if (typeof value === 'string') {
        return value.replace(/\\/g, '');
      }
      return value;
    });

    // Update the message in the database
    const { success } = await c.env.DB.prepare(`UPDATE chat SET message = ? WHERE chat_id = ?`).bind(updatedMessage, chat_id).run();

    if (success) {
      return c.text("Updated message successfully");
    } else {
      return c.text("Failed to update message");
    }
  } catch (error: any) {
    return c.json(error.message);
  }
});





//for getting the message by comparing the sender_id and receiver_id in the chat table
app.get('/chatbb/:sender_id/:receiver_id', async (c) => {
  try {
    const sender_id = c.req.param('sender_id');
    const receiver_id = c.req.param('receiver_id');

    const success = await c.env.DB.prepare(`
      SELECT message
      FROM chat
      WHERE (sender_id = ? AND receiver_id = ?)
         OR (sender_id = ? AND receiver_id = ?);
    `)
    .bind(sender_id, receiver_id, receiver_id, sender_id)
    .all();

    return c.json(success);
  } catch (error) {
    return c.json({ username: '', isUserId: 0, message: 'They are not starting their conversion' });
  }
});



//this is sample fetching router for the inviting the user
    app.get('/', (c) => {
      return c.text('Welcome to College Connection Project');
    });
    


    
    export default app;