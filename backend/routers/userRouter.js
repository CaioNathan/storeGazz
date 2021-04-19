import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import data from '../data.js';
import User from '../models/userModel.js';
import { generateToken, isAdmin, isAuth, tokenSendTemplete } from '../utils.js';
import sgMail from "@sendgrid/mail"
import Correios from 'node-correios';
import crypto from 'crypto';


const userRouter = express.Router();


userRouter.get('/correios/:destino',
expressAsyncHandler(async (req,res) => {
  const correios = new Correios();
  
  await correios.calcPreco({
    nCdServico:'40010',
    sCepOrigem:'73105903',
    sCepDestino:req.params.destino,
    nVlPeso:'0.5',
    nCdFormato:1,
    nVlComprimento:20,
    nVlAltura:4,
    nVlLargura:11,
    nVlDiametro:20,
   
   })
  .then(result => {

    const [frete] =result;
    console.log(frete);
    
    res.status(200).send(frete);
     
    
    
  })
  .catch(error => {
    res.status(401).send(error);
   console.log(error);
  });
    
}));

userRouter.post('/test',
expressAsyncHandler(async () => {
    
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
 
    const msg = {
        to: 'caio.sallenave@estudante.ifb.edu.br',
        from: 'nathansallenave@gmail.com',
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
 
    try {
        const result = await sgMail.send(msg);
        console.log('Email sent', result);
    }
    catch (error) {
        console.error(error)
    }
})
);


userRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

userRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      
      token: generateToken(createdUser),
    });
  })
);

userRouter.post(
  '/forgot',
  expressAsyncHandler(async(req,res)=>{
    const {email} = req.body;
    try{
      
      const user = await User.findOne({ email });
        if(!user)
         return res.status(400).send({error:'Usuário não encontrado'});


      const token = crypto.randomBytes(4).toString('hex');

      const now = new Date();

      now.setHours(now.getHours()+1);
      

      

      await User.findByIdAndUpdate(user._id,{
        '$set': {
          passwordResetToken: token,
          passwordResetExpires: now,
        }
      });

      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
 
    const msg = {
        to: 'caio.sallenave@estudante.ifb.edu.br',
        from: 'nathansallenave@gmail.com',
        subject: 'GazzStore',
        text: 'Token para Recuperar Senha',
        html: tokenSendTemplete(token),
    }

    const result = await sgMail.send(msg);
    
        console.log('Email sent', result);
 

     
    res.send({message:'O token foi enviado'});

    }catch(err){
      res.status(400).send({ message: 'Erro, Tente novamente' });
    }

  })
);

userRouter.post(
  '/newpassword',
  expressAsyncHandler(async(req,res)=>{
    const {email,token} = req.body;

    let password = bcrypt.hashSync(req.body.password, 8);
    
    try{
      
      const user = await User.findOne({ email })
      .select('+passwordResetToken passwordResetExpires');

        if(!user)
         return res.status(400).send({error:'Usuário não encontrado'});
        
         if(token !==user.passwordResetToken)
          return res.status(400).send({error:'Token invalid'});

        const now = new Date();

        if (now>user.passwordResetExpires)
          return res.status(400).send({error:'Token expirou, gere um novo'});
  

     
       
       user.password = password;

       await user.save();

       res.send();


    }catch(err){
      console.log(err);
      res.status(400).send({ message: 'Erro, Tente novamente' });
    }

  })
);

userRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);
userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    }
  })
);

userRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

userRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === 'admin@example.com') {
        res.status(400).send({ message: 'Can Not Delete Admin User' });
        return;
      }
      const deleteUser = await user.remove();
      res.send({ message: 'User Deleted', user: deleteUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

userRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = Boolean(req.body.isAdmin);
      // user.isAdmin = req.body.isAdmin || user.isAdmin;
      const updatedUser = await user.save();
      res.send({ message: 'User Updated', user: updatedUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

export default userRouter;
