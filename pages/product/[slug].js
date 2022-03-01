import React from 'react';
import {useRouter} from 'next/router';
import data from '../../utils/data'
import Layout from '../../components/layout'
import NextLink from 'next/link'
import Image from 'next/image'
import {Link, Grid, List, ListItem , Typography, Card, Button} from '@material-ui/core'
import useStyles from '../../utils/styles'
import db from "../../utils/db"
import Product from "../../models/Product"
import { useContext } from "react"
import { Store } from "../../utils/Store"
import axios from 'axios';

export default function productScreen(props) {
	const router = useRouter()
	const { state, dispatch} = useContext(Store);
	const {product} = props;
	const classes = useStyles()
	
    if(!product){
    	return <div>Product Not Found</div>;
    }
    const addToCartHandler = async () => {
      const existItem = state.cart.cartItems.find((x) => x._id === product._id)
      const quantity = existItem ? existItem.quantity +1 : 1
      const {data} = await axios.get(`/api/products/${product._id}`);
      if(data.countInStock < quantity){
      	window.alert('Sorry, Product is out of stock.')
      	return;
      }
      dispatch({type : 'CART_ADD_ITEM', payload : { ...product, quantity} })
      router.push('/cart')
    }

return (
 <Layout title={product.name} description={product.description}>
 <div className={classes.section}>
 <NextLink href="/" passHref>
 <Link><Typography> Back To Products</Typography></Link> 
 </NextLink>
 </div>
 <Grid container spacing={1}>
 <Grid item md={6} xs={12}>
 <Image src={product.image} alt={product.name} width={640} height={640} layout="responsive">
 </Image>
 </Grid>
 <Grid item md={3} xs={12}>
 <List>
 <ListItem>
  <Typography component="h1" variant="h1">{product.name}</Typography>
 </ListItem>
 <ListItem>
category : <Typography>{product.category}</Typography>
 </ListItem>
 <ListItem>
Brand : <Typography>{product.brand}</Typography>
 </ListItem>
 <ListItem>
Rating : <Typography>{product.rating} stars ({product.numReviews} reviews)</Typography>
 </ListItem>
 <ListItem>
Description : <Typography>{product.description}</Typography>
 </ListItem>
 </List> 
 </Grid>
 <Grid item md={3} xs={12}>
 <Card>
<ListItem>
<Grid container>
<Grid item xs={6}>
<Typography>Price</Typography>
</Grid>
<Grid item xs={6}>
${product.price}
</Grid>
</Grid>
</ListItem>
<ListItem>
<Grid container>
<Grid item xs={6}>
<Typography>Status</Typography>
</Grid>
<Grid item xs={6}>
<Typography>{product.countInStock > 0 ? 'In Stock' : 'Unavailable'}</Typography>
</Grid>
</Grid>
</ListItem>
<ListItem>
<Button onClick={addToCartHandler} fullWidth variant="contained" color="primary">
Add To Cart
</Button>
</ListItem>
 </Card>
 </Grid>
 </Grid>
 </Layout>
 );
}

export async function getServerSideProps(context){
	const {params} = context;
	const {slug} = params;
  await db.connect();
  const product =  await Product.findOne({slug}).lean();
  await db.disconnect()
  return {
    props : {
      product : db.convertDocToObj(product),
    },
  };
}