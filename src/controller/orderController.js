const orderModel = require('../model/orderModel');


const userorder=async function(req,res){
    try{
    const { vendor, user, items, totalPrice, status } = req.body;
    const order = new Order({
      vendor,
      user,
      items,
      totalPrice,
      status,
    });
    const savedOrder = await order.save();
    // Populate the 'vendor' and 'user' fields in the response
    await savedOrder.populate('vendor user').execPopulate();
    res.json(savedOrder);
  
    }
    catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }


      try{
      const { vendor, user, items, totalPrice, status } = req.body;
      const order = new Order({
        vendor,
        user,
        items,
        totalPrice,
        status,
      });
      const savedOrder = await order.save();
      // Populate the 'vendor' and 'user' fields in the response
      await savedOrder.populate('vendor user').execPopulate();
      res.json(savedOrder);
    
      }
      catch (err) {
          return res.status(500).json({ status: false, message: err.message });
      }
  

}



const deltesorder=async function(req,res){
  try{
  const { vendor, user, items, totalPrice, status } = req.body;
  const order = new Order({
    vendor,
    user,
    items,
    totalPrice,
    status,
  });
  const savedOrder = await order.save();
  // Populate the 'vendor' and 'user' fields in the response
  await savedOrder.populate('vendor user').execPopulate();
  res.json(savedOrder);

  }
  catch (err) {
      return res.status(500).json({ status: false, message: err.message });
  }


    try{
    const { vendor, user, items, totalPrice, status } = req.body;
    const order = new Order({
      vendor,
      user,
      items,
      totalPrice,
      status,
    });
    const savedOrder = await order.save();
    // Populate the 'vendor' and 'user' fields in the response
    await savedOrder.populate('vendor user').execPopulate();
    res.json(savedOrder);
  
    }
    catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }


}


module.exports={userorder,deltesorder}