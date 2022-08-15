import React from 'react';
import classNames from 'classnames';
import { SectionSplitProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';
import { useState } from 'react';
import Button from '../elements/Button';
//import { Link } from 'react-scroll';
import styles from '../SignUp/SignUp.module.scss';
import { addNewUseraoperation, giveFundOperation ,addprofileOperation} from '../../utils/operation';
//import AuthContext from '../../auth-context';
//const navigate = useNavigate();

const propTypes = {
  ...SectionSplitProps.types
}

const defaultProps = {
  ...SectionSplitProps.defaults
}


const FeaturesSplit = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  invertMobile,
  invertDesktop,
  alignTop,
  imageFill,
  ...props
}) => {

  const outerClasses = classNames(
    'features-split section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'features-split-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const splitClasses = classNames(
    'split-wrap',
    invertMobile && 'invert-mobile',
    invertDesktop && 'invert-desktop',
    alignTop && 'align-top'
  );

  const sectionHeader = {
    title: 'Lets Begin... ',
    // paragraph: 'Enter your email & uuid'
  };

   //-------------------------------variables----------------------------------------------

  const [ loading,setLoading] = useState(false);  
  const [email, setemail] = useState('');
  const [uuid, setuuid] = useState('');
  const [from_uuid,setfrom_uuid] = useState("");
  const [from_address, setfrom_address] = useState('');
  const [to_puid, setto_uuid] = useState('');
  const [comment, setcomment] = useState('');
  const [amount, setamount] = useState('');
  const [name, setname] = useState('');
  const [desc, setdesc] = useState('');
  const [comp, setcomp] = useState('');
  const [comp_t, setcomp_t] = useState('');
  const [ppt, setppt] = useState('');
  const [video, setvideo] = useState('');
  const [puuid,setpuuid] = useState('');
  const [puid, setpuid] = useState('');
  const [goal, setgoal] = useState('');
  const [dl, setdl] = useState('');
  const [addr, setaddr] = useState('');
  const [pic, setpic] = useState([]);
  //const context = useContext(AuthContext);

  //-----------------------input text handlers---------------------------------------------------------
  const inputuuidHandler = (e) => {
    console.log(e.target.value);
    setuuid(e.target.value);

  };
  const inputemailHandler = (e) => {
    console.log(e.target.value);
    setemail(e.target.value);

  };
  const from_uuidHandler = (e) => {
    console.log(e.target.value);
    setfrom_uuid(e.target.value);

  };
  const from_addressHandler = (e) => {
    console.log(e.target.value);
    setfrom_address(e.target.value);

  };
  
  const to_puidHandler = (e) => {
    console.log(e.target.value);
    setto_uuid(e.target.value);

  };
  const amountHandler = (e) => {
    console.log(e.target.value);
    setamount(e.target.value);

  };
  const commentHandler = (e) => {
    console.log(e.target.value);
    setcomment(e.target.value);

  };
  const nameHandler = (e) => {
    console.log(e.target.value);
    setname(e.target.value);

  };
  const descHandler = (e) => {
    console.log(e.target.value);
    setdesc(e.target.value);

  };
  const compHandler = (e) => {
    console.log(e.target.value);
    setcomp(e.target.value);

  };
  const comp_tHandler = (e) => {
    console.log(e.target.value);
    setcomp_t(e.target.value);

  };
  const pptHandler = (e) => {
    console.log(e.target.value);
    setppt(e.target.value);

  };
  const videoHandler = (e) => {
    console.log(e.target.value);
    setvideo(e.target.value);

  };
  const puidHandler = (e) => {
    console.log(e.target.value);
    setpuid(e.target.value);

  };
  const goalHandler = (e) => {
    console.log(e.target.value);
    setgoal(e.target.value);

  };
  const dlHandler = (e) => {
    console.log(e.target.value);
    setdl(e.target.value);

  };
  const addrHandler = (e) => {
    console.log(e.target.value);
    setaddr(e.target.value);

  };
  const picHandler = (e) => {
    console.log(e.target.value);
    setpic(e.target.value);

  };
  const puuidHandler = (e) => {
    console.log(e.target.value);
    setpuuid(e.target.value);

  };
  
  
  
  //------------------------------------------ functions-----------------------------------------------------
  // adding transactions
  const onfund = async () => {
    try {
      setLoading(true);
      await giveFundOperation(from_uuid,from_address,to_puid,amount,comment);
      alert("Transaction succesful!");
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };
  // adding new user
  
  const onadduser = async () => {
    try {
      setLoading(true);
      await addNewUseraoperation(email,uuid);
      alert("New Use Added!");
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  const onaddprofile = async () => {
    try {
      setLoading(true);
      await addprofileOperation(name,desc,comp,comp_t,ppt,video,puuid,puid,goal,dl,addr,pic);
      alert("New profile Added!");
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };






  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={splitClasses}>

        {    /* ---------------------------user input---------------------------------------------------------*/}
            <div id="user" className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item">
               <h3 className="mt-0 mb-12">
                  Add new user
                </h3>
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Enter your uuid and email
                </div>

                <div className="container">
                  <form className={styles.form}>
                    <input onChange={inputuuidHandler}
                      className={styles.input}
                      type='text'
                      value={uuid}
                      placeholder='uuid'
                      required />
                    <input
                      onChange={inputemailHandler}
                      className={styles.input}
                      type='email'
                      value={email}
                      placeholder='Email'
                      required />

                  </form>
                </div>



                <div className={styles.buttonContainer}>
                  <Button tag="a" color="primary" wideMobile onClick={onadduser} >
                    Add new user
                  </Button>
                </div>
              </div>

              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                <Image
                  src={require('./../../assets/images/features-split-image-01.png')}
                  alt="Features split 01"
                  width={528}
                  height={396} />
              </div>
            </div>

      {     /* -----------------------Add Profile-----------------------------------------------------------*/ }
            <div id="applic" className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item">
              <h3 className="mt-0 mb-12">
                  Add your profile
                </h3>
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                Enter the details
                </div>
                <div className="container">
                  <form className={styles.form}>

                    <input onChange={nameHandler}
                      className={styles.input}
                      type='text'
                      value={name}
                      placeholder='Your Name'
                      required />

                    
                    <input onChange={puuidHandler}
                      className={styles.input}
                      type='text'
                      value={puuid}
                      placeholder='Your uuid'
                      required />

                    <input onChange={addrHandler}
                      className={styles.input}
                      type='text'
                      value={addr}
                      placeholder='Your Wallet address'
                      required />

                    <input onChange={puidHandler}
                      className={styles.input}
                      type='text'
                      value={puid}
                      placeholder='Project id'
                      required />

                    <input onChange={compHandler}
                      className={styles.input}
                      type='text'
                      value={comp}
                      placeholder='Company Name'
                      required />

                    <input onChange={comp_tHandler}
                      className={styles.input}
                      type='text'
                      value={comp_t}
                      placeholder='Company type'
                      required />

                    <input
                      onChange={descHandler}
                      className={styles.input}
                      type='text'
                      value={desc}
                      placeholder='Company description'
                      required />

                    <input onChange={pptHandler}
                      className={styles.input}
                      type='text'
                      value={ppt}
                      placeholder='Project ppt'
                      required />

                    <input onChange={videoHandler}
                      className={styles.input}
                      type='text'
                      value={video}
                      placeholder='Project video'
                      required />
                    <input onChange={goalHandler}
                      className={styles.input}
                      type='text'
                      value={goal}
                      placeholder='Goal Amount'
                      required />  

                    <input onChange={dlHandler}
                      className={styles.input}
                      type='text'
                      value={dl}
                      placeholder='Project deadline'
                      required />  

                    <input onChange={picHandler}
                      className={styles.input}
                      type='text'
                      value={pic}
                      placeholder='Project pictures or nfts'
                       />  
                      <Button tag="a" color="primary" wideMobile onClick={onaddprofile} >
                       {loading ? "Loading" : "Proceed"}
                      </Button> 
                  </form>
                </div>
                
              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                <Image
                  src={require('./../../assets/images/features-split-image-03.png')}
                  alt="Features split 03"
                  width={528}
                  height={396} />
              </div>
            </div>
{/*------------------------------------------ transaction--------------------------------------------*/}
            <div id="invest" className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-right" data-reveal-container=".split-item">
              <h3 className="mt-0 mb-12">
                  Give Funds
                </h3>
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Enter DETAILS
                </div>

                <div className="container">
                  <form className={styles.form}>
                    <input onChange={from_uuidHandler}
                      className={styles.input}
                      type='text'
                      value={from_uuid}
                      placeholder='your_uuid'
                      required />
                    <input
                      onChange={from_addressHandler}
                      className={styles.input}
                      type='text'
                      value={from_address}
                      placeholder='your_walletAddress'
                      required />
                    <input onChange={to_puidHandler}
                      className={styles.input}
                      type='text'
                      value={to_puid}
                      placeholder='receiver uid'
                      required />
                    <input onChange={amountHandler}
                      className={styles.input}
                      type='number'
                      value={amount}
                      placeholder='Amount'
                      required />
                    <input onChange={commentHandler}
                      className={styles.input}
                      type='text'
                      value={comment}
                      placeholder='Comment'
                      required />      
                      <div className={styles.buttonContainer}>
                      <Button tag="a" color="primary" wideMobile onClick={onfund} >
                       {loading ? "Loading" : "Proceed"}
                      </Button>
                     </div>

                  </form>
                </div>

              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                <Image
                  src={require('./../../assets/images/features-split-image-02.png')}
                  alt="Features split 02"
                  width={528}
                  height={396} />
              </div>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
};

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;