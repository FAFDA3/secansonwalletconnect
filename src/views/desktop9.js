import React from 'react'

import { Helmet } from 'react-helmet'

import './desktop9.css'

import {ethers} from "ethers";
import abi from './ABI.json';
import { useEffect, useState } from "react";
import ok from './ok.png';
import not from './not.png';
// import { useMediaQuery } from 'react-responsive';
// import Responsive from 'react-responsive';


let provider;
let signer;
let client_address;
let welcomenft;
let n_address;
let cost;



const Desktop9 = (props) => {


// ///GET THE COLLECTION ADDRESS AND ID FROM link
// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const urlParams2 = new URLSearchParams(queryString);
// const _collec_url = urlParams.get('_collec_url'); //link example ?_collec_url=0x039e2e1DdaCA62Eb760b28C2c18e0f46eB165E26
// const _ID_url = urlParams2.get('_ID_url');
// const _ID_url2 = urlParams2.get('_ID_url2');
//
 const smart_contract = "0x9cdd9a5EA3DD9594237C84A6D9dDEad5B8570AD2";
//
//
//
  let list = [];
 const [connected_, setconnection_] = useState(false);
   const [whitelist, setwhitelist] = useState();
   const [nft_cost, set_nft_cost] = useState();
   const [check1, setcheck1] = useState();
   const [check2, setcheck2] = useState();
//
  const[pr1, setpr1] = useState();
  const[pr2, setpr2] = useState();
  const[pr3, setpr3] = useState();
  const[pr4, setpr4] = useState();
  const[pr5, setpr5] = useState();


  const[addpr1, setaddpr1] = useState();
  const[addpr2, setaddpr2] = useState();
  const[addpr3, setaddpr3] = useState();
  const[addpr4, setaddpr4] = useState();
  const[addpr5, setaddpr5] = useState();
//
//
//
//   const[money, setmoney] = useState();

  // const returndata = async () => {
  //   let input = document.getElementById("_ID_url").value;
  //   let input2 = document.getElementById("_ID_url2").value;
  //   let _check1 = await welcomenft.isWhitelisted(input);
  //   let _check2 = await welcomenft.isWhitelisted(input2);
  //
  //   if(_check1 == true){
  //     console.log("address 1 whitelisted");
  //     setcheck1(true);
  //   }
  //   if(_check1== false){
  //       setcheck1(false);
  //   }
  //
  //   if(_check2 == true){
  //     console.log("address 2 whitelisted");
  //     setcheck2(true);
  //   }
  //
  //   if(_check2 == false){
  //     setcheck2(false);
  //   }
  //
  //   if(_check1 != true && _check2 != true){
  //     await welcomenft.mint(1, input, input2 , {value: cost });
  //
  //   }
  //
  //   console.log(input);
  //   console.log(input2);
  //
  // }

  //
  // const connection_ = async  () =>{

  //             await window.ethereum.enable();
  //             provider = new ethers.providers.Web3Provider(window.ethereum);
  //             signer = await provider.getSigner();
  //             client_address = await signer.getAddress();
  //             setconnection(true);

  //             welcomenft = new ethers.Contract( smart_contract,  abi, signer);
  //             n_address = await welcomenft.n_whitelisted();
  //             cost = await  welcomenft.cost();

  //             const isPR = await welcomenft.isPR(client_address);
  //             console.log(isPR);
  //             if(isPR == false){
  //                 const welcomeboard = await welcomenft.welcome(client_address);
  //                 const _money = await welcomeboard.money/1;
  //                 console.log(_money);
  //                 setmoney(_money);

  //               } else if (isPR== true){
  //                 const welcomeboard = await welcomenft.welcome_PR(client_address);
  //                 const _money = await welcomeboard.money/1;
  //                 console.log(_money);
  //                 setmoney(_money);

  //               }

  //             console.log (cost);
  //             set_nft_cost(cost/1000000000000000000);

  //             console.log(n_address);
  //             for(let i=0; i<=(n_address-1); i++ ){
  //                 list[i] =  await welcomenft.whitelist(i);

  //               }

  //             setwhitelist(list);
  //             console.log(list);
  //             prdata();
  //             console.log("data");
  // }


  // const retire_r = async () =>{
  //     await   welcomenft.retire_reward();
  // }
  //
  //
  //
  //
  // function renderlist() {
  //
  //       return(
  //         <div className = "whitelist">
  //               <div> {whitelist[0]}   </div>
  //               <div> {whitelist[1]}   </div>
  //               <div> {whitelist[2]}   </div>
  //               <div> {whitelist[3]}   </div>
  //               <div> {whitelist[4]}   </div>
  //               <div> {whitelist[5]}   </div>
  //               <div> {whitelist[6]}   </div>
  //               <div> {whitelist[7]}   </div>
  //               <div> {whitelist[8]}   </div>
  //               <div> {whitelist[9]}   </div>
  //               <div> {whitelist[10]}   </div>
  //               <div> {whitelist[11]}   </div>
  //               <div> {whitelist[12]}   </div>
  //               <div> {whitelist[13]}   </div>
  //               <div> {whitelist[14]}   </div>
  //               <div> {whitelist[15]}   </div>
  //               <div> {whitelist[16]}   </div>
  //               <div> {whitelist[17]}   </div>
  //               <div> {whitelist[18]}   </div>
  //               <div> {whitelist[19]}   </div>
  //               <div> {whitelist[20]}   </div>
  //               <div> {whitelist[21]}   </div>
  //               <div> {whitelist[22]}   </div>
  //               <div> {whitelist[23]}   </div>
  //               <div> {whitelist[24]}   </div>
  //               <div> {whitelist[25]}   </div>
  //               <div> {whitelist[26]}   </div>
  //               <div> {whitelist[27]}   </div>
  //               <div> {whitelist[28]}   </div>
  //               <div> {whitelist[29]}   </div>
  //               <div> {whitelist[30]}   </div>
  //               <div> {whitelist[31]}   </div>
  //               <div> {whitelist[32]}   </div>
  //               <div> {whitelist[33]}   </div>
  //               <div> {whitelist[34]}   </div>
  //               <div> {whitelist[35]}   </div>
  //               <div> {whitelist[36]}   </div>
  //               <div> {whitelist[37]}   </div>
  //               <div> {whitelist[38]}   </div>
  //               <div> {whitelist[39]}   </div>
  //               <div> {whitelist[40]}   </div>
  //               <div> {whitelist[41]}   </div>
  //               <div> {whitelist[42]}   </div>
  //               <div> {whitelist[43]}   </div>
  //               <div> {whitelist[44]}   </div>
  //               <div> {whitelist[45]}   </div>
  //               <div> {whitelist[46]}   </div>
  //               <div> {whitelist[47]}   </div>
  //               <div> {whitelist[48]}   </div>
  //               <div> {whitelist[49]}   </div>
  //               <div> {whitelist[50]}   </div>
  //               <div> {whitelist[51]}   </div>
  //               <div> {whitelist[52]}   </div>
  //               <div> {whitelist[53]}   </div>
  //               <div> {whitelist[54]}   </div>
  //               <div> {whitelist[55]}   </div>
  //               <div> {whitelist[56]}   </div>
  //               <div> {whitelist[57]}   </div>
  //               <div> {whitelist[58]}   </div>
  //               <div> {whitelist[59]}   </div>
  //               <div> {whitelist[60]}   </div>
  //               <div> {whitelist[61]}   </div>
  //               <div> {whitelist[62]}   </div>
  //               <div> {whitelist[63]}   </div>
  //               <div> {whitelist[64]}   </div>
  //               <div> {whitelist[65]}   </div>
  //               <div> {whitelist[66]}   </div>
  //               <div> {whitelist[67]}   </div>
  //               <div> {whitelist[68]}   </div>
  //               <div> {whitelist[69]}   </div>
  //        </div>
  //
  //
  //       )
  //
  //
  // }


  // async function prdata(){
  //   console.log("pr data");
  //   let p1 = await welcomenft.PR1();
  //   let p2 = await welcomenft.PR2();
  //   let p3 = await welcomenft.PR3();
  //   let p4 = await welcomenft.PR4();
  //   let p5 = await welcomenft.PR5();
  //
  //
  //   setaddpr1(p1);
  //   setaddpr2(p2);
  //   setaddpr3(p3);
  //   setaddpr4(p4);
  //   setaddpr5(p5);
  //
  //   console.log(p1);
  //   console.log(p2);
  //   console.log(p3);
  //   console.log(p4);
  //   console.log(p5);
  //
  //   let countPR1 = await welcomenft.countPR(p1);
  //   let countPR2 = await welcomenft.countPR(p2);
  //   let countPR3 = await welcomenft.countPR(p3);
  //   let countPR4 = await welcomenft.countPR(p4);
  //   let countPR5 = await welcomenft.countPR(p5);
  //
  //   setpr1(countPR1/1);
  //   setpr2(countPR2/1);
  //   setpr3(countPR3/1);
  //   setpr4(countPR4/1);
  //   setpr5(countPR5/1);
  //
  //   console.log(countPR1);
  //   console.log(countPR2);
  //   console.log(countPR3);
  //   console.log(countPR4);
  //   console.log(countPR5);
  //
  //
  // }


  return (
    <div className="desktop9-container">
      <Helmet>
        <title>exported project</title>
      </Helmet>
      <div className="desktop9-desktop9">
        <div className="desktop9-frame427319597">
          <img
            alt="Rectangle121701"
            src="/playground_assets/rectangle121701-p8q-400h.png"
            className="desktop9-rectangle12"
          />
          <img
            alt="Ellipse31702"
            src="/playground_assets/ellipse31702-6ejb-700h.png"
            className="desktop9-ellipse3"
          />
        </div>
        <div className="desktop9-frame7">
          <span className="desktop9-text">MENU</span>
          <div className="desktop9-frame3">
            <div className="desktop9-frame1">
              <div className="desktop9-home2">
                <div className="desktop9-vuesaxlinearhome2">
                  <div className="desktop9-home21">
                    <img
                      alt="VectorI171"
                      src="/playground_assets/vectori171-y73d.svg"
                      className="desktop9-vector"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="desktop9-frame8"></div>
        <div className="desktop9-frame12">
          <span className="desktop9-text01">Dashboard Overview</span>
        </div>
        <div className="desktop9-frame26">
          <div className="desktop9-frame24">
            <div className="desktop9-frame19">
              <span className="desktop9-text02">Nft minted</span>
            </div>
            <img
              alt="Vector1787"
              src="/playground_assets/vector1787-vu5s.svg"
              className="desktop9-vector1"
            />
          </div>
          <div className="desktop9-frame25">
            <div className="desktop9-container1">
              <span className="desktop9-text03">Your  fee from referral</span>
              <div className="desktop9-frame191"></div>
            </div>
            <div className="desktop9-container2">
              <div className="desktop9-container3">
                <button className="desktop9-button button">Claim</button>
              </div>
            </div>
          </div>
        </div>
        <div className="desktop9-frame427319583">
          <div className="desktop9-frame427319585">
            <span className="desktop9-text04">Whitelist Dashboard</span>
            <div className="desktop9-frame427319580"></div>
          </div>
          <div className="desktop9-group427318804">
            <ul className="desktop9-ul list">
              <li className="list-item">
                <span>Text</span>
              </li>
              <li className="desktop9-li1 list-item">
                <span>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                </span>
              </li>
              <li className="list-item">
                <span>Text</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="desktop9-frame4273195851">
          <div className="desktop9-frame427319584">
            <span className="desktop9-text16">Referral </span>
          </div>
          <div className="desktop9-container4">
            <input
              type="text"
              placeholder="Enter  Valid address"
              className="desktop9-textinput input"
            />
            <input
              type="text"
              placeholder="Enter Valid address"
              className="desktop9-textinput1 input"
            />
          </div>
          <button className="desktop9-button1 button">    Mint</button>
          <button className="desktop9-button2 button">HOME </button>
          <button className="desktop9-button3 button">ETHSCAN</button>
          <button className="desktop9-button4 button">ABOUT US</button>
          <button className="desktop9-button5 button">ODLABS</button>
        </div>
        <div className="desktop9-frame4273195841">
          <div className="desktop9-frame4273195842">
            <span className="desktop9-text17">Influencer Dashboard</span>
          </div>
          <div className="desktop9-frame427319593">
            <div className="desktop9-frame427319592">
              <span className="desktop9-text18">INFLUENCER ID</span>
              <span className="desktop9-text19">ADDRESS</span>
              <span className="desktop9-text20">REFELLED</span>
            </div>
            <img
              alt="Line511900"
              src="/playground_assets/line511900-9inr.svg"
              className="desktop9-line51"
            />
            <div className="desktop9-frame427319590"></div>
            <img
              alt="Line521912"
              src="/playground_assets/line521912-mneg.svg"
              className="desktop9-line52"
            />
            <div className="desktop9-frame427319591"></div>
            <img
              alt="Line531923"
              src="/playground_assets/line531923-bv2a.svg"
              className="desktop9-line53"
            />
          </div>
        </div>
        {/* <button className="desktop9-button6 button" onClick = {connection_}>Reset</button> */}
      </div>
    </div>
  )
}

export default Desktop9
