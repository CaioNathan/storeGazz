import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import {
  isAdmin,
  isAuth,
  
  mailgun,
  OrderEmailTemplate,
  payOrderEmailTemplate,
  rastreioOrderTemplate,
} from '../utils.js';
import sgMail from "@sendgrid/mail"

const orderRouter = express.Router();
orderRouter.get(
  '/',
  isAuth,
  
  expressAsyncHandler(async (req, res) => {
   

    const orders = await Order.find().populate(
      'user',
      'email',
    );
    res.send(orders);
  })
);
orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);

orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: 'Cart is empty' });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });

      const createdOrder = await order.save();

      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
 
        const msg = {
          from: 'nathansallenave@gmail.com',
          to: req.user.email,
          subject: `Gazz - Novo Pedido`,
          html: OrderEmailTemplate(createdOrder),
        }
     
        try {
            const result = await sgMail.send(msg);
            console.log('Email sent', result);
        }
        catch (error) {
            console.error(error)
        }
      res
        .status(201)
        .send({ message: 'New Order Created', order: createdOrder });

    }
  })
);

orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.put(
  '/:id/pay',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'email name'
    );
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedOrder = await order.save();

      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
 
        const msg = {
          from: 'nathansallenave@gmail.com',
          to: updatedOrder.user.email,
          subject: `Gazz - Pagamento Confirmado`,
          html: payOrderEmailTemplate(updatedOrder),
        }
     
        try {
            const result = await sgMail.send(msg);
            console.log('Email sent', result);
        }
        catch (error) {
            console.error(error)
        }
      res.send({ message: 'Order Paid', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      const deleteOrder = await order.remove();
      res.send({ message: 'Order Deleted', order: deleteOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.put(
  '/:id/deliver',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.send({ message: 'Order Delivered', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);
orderRouter.put(
  '/:id/rastreio',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'email name');
    if (order) {
      order.codRastreio = req.body.codRastreio;
      
      const updatedOrder = await order.save();
      
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
 
        const msg = {
          from: 'nathansallenave@gmail.com',
          to: updatedOrder.user.email,
          subject: `Gazz - Rastreio do Pedido`,
          html: rastreioOrderTemplate(updatedOrder),
        }
     
        try {
            const result = await sgMail.send(msg);
            console.log('Email sent', result);
        }
        catch (error) {
            console.error(error)
        }
      res.send({ message: 'Codigo de Rastreio adicionado', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);



export default orderRouter;
