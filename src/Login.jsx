import { styled } from '@mui/material/styles';
import { FormControl, FormLabel, TextField, FormControlLabel, Checkbox, Button,Box, Container,Typography, Link} from '@mui/material';


// const GardientBg =styled(Container)({
//   background: 'linear-gradient(45deg, #FF6347, #FFD700)',
//   height: '88vh',
//   width:'88vw',
//   overflow:'hidden',
//   margin:'0',
//   padding:'0',
//   display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
// })


const StyledCard = styled(Box)({
  background: '#FFFFFF',
  width: '35vw',
  height: '85vh',
  marginTop: '5%',
  marginBottom: '5%',
  borderRadius: '22px',
  boxShadow: '0 0 8px 0 rgba(255, 99, 71, 0.2), 0 0 20px 0 rgba(255, 99, 71, 0.19)',
  display:'flex',
  flexDirection:'column'
})

const StyledTitle=styled(Typography)({
  fontFamily: 'Montserrat, sans-serif',
  opacity:'80%',
    fontSize: '35px',
    marginTop: '2rem',
    marginBottom: '1rem',
    textAlign:'center'
})

const StyledFormControl =styled(FormControl)({
  width: '80%',
  marginLeft:'10%'
})

const StyledFormLabel = styled(FormLabel)({
  fontFamily: 'Montserrat, sans-serif',
  textAlign:'left',
  fontSize: '20px',
})

const StyledTextField = styled(TextField)({
  width: '100%',
  borderRadius: '22px',
  boxShadow: '0 0 8px 0 rgba(255, 99, 71, 0.2), 0 0 20px 0 rgba(255, 99, 71, 0.19)',
  '.MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: '22px', 
    },
    '&:hover fieldset': { 
      borderColor: '#ff6347'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#ff6347'
    },

}
})

const StyledFormControlLabel =styled(FormControlLabel)({
  fontFamily: 'Montserrat, sans-serif',
  '& .MuiSvgIcon-root': {
    color: '#ff6347', 
  },
  '&.Mui-checked .MuiSvgIcon-root': {
    color: '#ff6347', 
  },
})

const StyledButton = styled(Button)({
  width: '165px',
  height: '60px',
  borderRadius: '30px',
  border: '1px solid #ff6347',
  backgroundColor: '#ff6347',
  color: '#FFFFFF',
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '20px',
  alignSelf:'center',
  boxShadow: '0 0 8px 0 rgba(255, 99, 71, 0.2), 0 0 20px 0 rgba(255, 99, 71, 0.19)',
  '&:hover': {
    backgroundColor: '#e55344', 
    borderColor: '#c9302c',
  },
   '&:focus': {
    border: '2px solid #d9534f', 
    outline: 'none'
   }
})

const StyledSignUp=styled(Typography)({
  margin: '1rem 0'
})

const StyledLink=styled(Link)({
  color:'#ff6347',
  textDecorationColor: '#FF6347',
  '&:hover': {
    color:'#d9534f'
  }
})

export default function LoginForm() {
  return (
    //<GardientBg>
  <StyledCard>
    <StyledTitle variant="h4">Login</StyledTitle>
    <StyledFormControl>
      <StyledFormLabel required htmlFor="email">Email</StyledFormLabel><br/>
      <StyledTextField required  /><br/>
      <StyledFormLabel required htmlFor="password">Password</StyledFormLabel><br/>
      <StyledTextField  type="password" /><br/>
      <StyledFormControlLabel control={<Checkbox value="remember" color="#ff6347" />}
                        label="Remember me"/><br/>
       <StyledButton type="submit"variant="contained">Sign in </StyledButton>
    </StyledFormControl>                        
    <StyledSignUp variant='subtitle1'>Have an account?<StyledLink>SignUp</StyledLink></StyledSignUp>
  </StyledCard>
    //</GardientBg>
  );
}
