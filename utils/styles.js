import { makeStyles } from '@material-ui/core'

 const useStyles = makeStyles({

	navbar : {
		backgroundColor : '#203040',
		'& a' : {
			color : '#ffffff',
			marginLeft: 10
		},

	},
	main : {
		minHeight : '80vh',
	},
	footer : {
		textAlign : 'center',
		marginTop : 10
	},
	brand : {
		fontWeight : 'bold',
		fontSize : '1.5rem',
	},
	grow : {
		flexGrow : 1
	},
	section : {
		marginTop : 10,
		mmarginBottom : 10,
	},
	form : {
		maxWidth :  800,
		margin : '0 auto'
	},
	navbarButton :  {
		color : '#ffffff',
        textTransform : 'initial',
        
	},
	transparentBackground : {
		backgroundColor : 'transparent'
	},
	error: {
    color: '#f04040',
  },
  fullWidth : {
  	width : '100%'
  }
})

 export default useStyles;