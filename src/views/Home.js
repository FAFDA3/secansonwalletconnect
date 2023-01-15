import React from "react";

import { Helmet } from "react-helmet";

import Desktop9 from "./desktop9";
// import { WalletConnectProvider } from '@walletconnect/react-native';

import "./page.css";
import "./desktop9.css";
import abi from "./ABI.json";
import ok from "./ok.png";
import not from "./not.png";
import hourglass from "./hourglass.gif";
import { useAccount } from "wagmi";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import WalletConnect from "../component/WalletConnect";
let signer;
let provider;
let client_address;
let welcomenft;
let n_address;
let cost;

const Home = (props) => {
  // =================================================================================================
  // my code
  const { connector, address: userAccount } = useAccount();
  console.log({ connector, userAccount });

  const [connected, setconnection] = useState(false);

  ///GET THE COLLECTION ADDRESS AND ID FROM link
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const urlParams2 = new URLSearchParams(queryString);
  const _collec_url = urlParams.get("_collec_url"); //link example ?_collec_url=0x039e2e1DdaCA62Eb760b28C2c18e0f46eB165E26
  const _ID_url = urlParams2.get("_ID_url");
  const _ID_url2 = urlParams2.get("_ID_url2");
  //
  const smart_contract = "0x9cdd9a5EA3DD9594237C84A6D9dDEad5B8570AD2";
  //
  //
  //
  let list = [];
  const [aconnected_, asetconnection_] = useState(false);
  const [whitelist, setwhitelist] = useState();
  const [nft_cost, set_nft_cost] = useState();
  const [check1, setcheck1] = useState();
  const [check2, setcheck2] = useState();

  const [pr1, setpr1] = useState();
  const [pr2, setpr2] = useState();
  const [pr3, setpr3] = useState();
  const [pr4, setpr4] = useState();
  const [pr5, setpr5] = useState();

  const [addpr1, setaddpr1] = useState();
  const [addpr2, setaddpr2] = useState();
  const [addpr3, setaddpr3] = useState();
  const [addpr4, setaddpr4] = useState();
  const [addpr5, setaddpr5] = useState();

  const [money, setmoney] = useState();

  const[data_obtained, setdata] = useState(false);

  const checkdata = async () => {
    let input = document.getElementById("_ID_url")?.value;
    let input2 = document.getElementById("_ID_url2")?.value;

    if (input != "") {
      let _check1 = await welcomenft.isWhitelisted(input);
      if (_check1 == true) {
        console.log("address 1 whitelisted");
        setcheck1(true);
      }
      if (_check1 == false) {
        setcheck1(false);
      }
    }

    if (input2 != "") {
      let _check2 = await welcomenft.isWhitelisted(input2);
      if (_check2 == true) {
        console.log("address 2 whitelisted");
        setcheck2(true);
      }

      if (_check2 == false) {
        setcheck2(false);
      }
    }

    else{
      console.log("empy input");
    }

    console.log(input);
    console.log(input2);
  };

  // funzione clessidra
  const startTimer = () => {
    // codice per far girare la clessidra
    console.log("working...");
    return (
      <div id="gif-container">
        <img src={hourglass} id="gif" alt="animated gif"></img>
      </div>
    );
  };

  const returndata = async () => {
    //const intervalId = setInterval(startTimer, 10000000000000000);
    //startTimer();

    let input = document.getElementById("_ID_url").value;
    let input2 = document.getElementById("_ID_url2").value;
    let _check1 = await welcomenft.isWhitelisted(input);
    let _check2 = await welcomenft.isWhitelisted(input2);

    if (_check1 == true) {
      console.log("address 1 whitelisted");
      setcheck1(true);
    }
    if (_check1 == false) {
      setcheck1(false);
    }

    if (_check2 == true) {
      console.log("address 2 whitelisted");
      setcheck2(true);
    }

    if (_check2 == false) {
      setcheck2(false);
    }

    if (_check1 != true && _check2 != true) {
      await welcomenft.mint(1, input, input2, { value: cost, gasLimit: 20000 });
    }

    console.log(input);
    console.log(input2);
    //clearInterval(intervalId);
  };
  useEffect(()=>{
    checkdata()
  },[check1,check2])

  const intervalId = setInterval(checkdata, 1000);


  async function resetconn() {
    setdata(false);
  }

  useEffect(() => {
    if (userAccount) {
      setconnection(true);
    } else {
      setconnection(false);
    }
  }, [userAccount]);

  const connection = async () => {
    await window.ethereum.enable();
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = await provider.getSigner();
    client_address = await signer.getAddress();
    setconnection(true);

    welcomenft = new ethers.Contract(smart_contract, abi, signer);
    n_address = await welcomenft.n_whitelisted();
    cost = await welcomenft.cost();

    const isPR = await welcomenft.isPR(client_address);
    console.log(isPR);
    if (isPR == false) {
      const welcomeboard = await welcomenft.welcome(client_address);
      const _money = (await welcomeboard.money) / 1;
      console.log(_money);
      setmoney(_money);
    } else if (isPR == true) {
      const welcomeboard = await welcomenft.welcome_PR(client_address);
      const _money = (await welcomeboard.money) / 1;
      console.log(_money);
      setmoney(_money);
    }

    console.log(cost);
    set_nft_cost(cost / 1000000000000000000);

    console.log(n_address);
    for (let i = 0; i <= n_address - 1; i++) {
      list[i] = await welcomenft.whitelist(i);
    }

    setwhitelist(list);
    console.log(list);
    prdata();
    console.log("data");

    setdata(true);
  };

  const switchAddress = async () => {
    await window.ethereum.enable();

    // Get the provider from MetaMask
    const provider_ = new ethers.providers.Web3Provider(window.ethereum);

    // Request access to the user's accounts
    await provider_.getSigner();

    // Get the user's accounts
    const accounts = await provider.listAccounts();

    // Select the first account
    const account = accounts[0];

    // Set the provider to use the selected account
    provider.resetSigningProviders(account);
  };

  const retire_r = async () => {
    await welcomenft.retire_reward();
  };

  async function switchaddress_() {
    const provider_ = new ethers.providers.Web3Provider(window.ethereum, "any");
    let accounts_ = await provider_.send("eth_requestAccounts", []);
    let account_ = accounts_[0];
    provider_.on("accountsChanged", function (accounts_) {
      account_ = accounts_[0];
      console.log(address_); // Print new address
    });

    const signer_ = provider_.getSigner();

    const address_ = await signer_.getAddress();

    console.log(address_);
  }

  function renderlist() {
    return (
      <div className="whitelist">
        <div> {whitelist[0]} </div>
        <div> {whitelist[1]} </div>
        <div> {whitelist[2]} </div>
        <div> {whitelist[3]} </div>
        <div> {whitelist[4]} </div>
        <div> {whitelist[5]} </div>
        <div> {whitelist[6]} </div>
        <div> {whitelist[7]} </div>
        <div> {whitelist[8]} </div>
        <div> {whitelist[9]} </div>
        <div> {whitelist[10]} </div>
        <div> {whitelist[11]} </div>
        <div> {whitelist[12]} </div>
        <div> {whitelist[13]} </div>
        <div> {whitelist[14]} </div>
        <div> {whitelist[15]} </div>
        <div> {whitelist[16]} </div>
        <div> {whitelist[17]} </div>
        <div> {whitelist[18]} </div>
        <div> {whitelist[19]} </div>
        <div> {whitelist[20]} </div>
        <div> {whitelist[21]} </div>
        <div> {whitelist[22]} </div>
        <div> {whitelist[23]} </div>
        <div> {whitelist[24]} </div>
        <div> {whitelist[25]} </div>
        <div> {whitelist[26]} </div>
        <div> {whitelist[27]} </div>
        <div> {whitelist[28]} </div>
        <div> {whitelist[29]} </div>
        <div> {whitelist[30]} </div>
        <div> {whitelist[31]} </div>
        <div> {whitelist[32]} </div>
        <div> {whitelist[33]} </div>
        <div> {whitelist[34]} </div>
        <div> {whitelist[35]} </div>
        <div> {whitelist[36]} </div>
        <div> {whitelist[37]} </div>
        <div> {whitelist[38]} </div>
        <div> {whitelist[39]} </div>
        <div> {whitelist[40]} </div>
        <div> {whitelist[41]} </div>
        <div> {whitelist[42]} </div>
        <div> {whitelist[43]} </div>
        <div> {whitelist[44]} </div>
        <div> {whitelist[45]} </div>
        <div> {whitelist[46]} </div>
        <div> {whitelist[47]} </div>
        <div> {whitelist[48]} </div>
        <div> {whitelist[49]} </div>
        <div> {whitelist[50]} </div>
        <div> {whitelist[51]} </div>
        <div> {whitelist[52]} </div>
        <div> {whitelist[53]} </div>
        <div> {whitelist[54]} </div>
        <div> {whitelist[55]} </div>
        <div> {whitelist[56]} </div>
        <div> {whitelist[57]} </div>
        <div> {whitelist[58]} </div>
        <div> {whitelist[59]} </div>
        <div> {whitelist[60]} </div>
        <div> {whitelist[61]} </div>
        <div> {whitelist[62]} </div>
        <div> {whitelist[63]} </div>
        <div> {whitelist[64]} </div>
        <div> {whitelist[65]} </div>
        <div> {whitelist[66]} </div>
        <div> {whitelist[67]} </div>
        <div> {whitelist[68]} </div>
        <div> {whitelist[69]} </div>
      </div>
    );
  }

  async function prdata() {
    console.log("pr data");
    let p1 = await welcomenft.PR1();
    let p2 = await welcomenft.PR2();
    let p3 = await welcomenft.PR3();
    let p4 = await welcomenft.PR4();
    let p5 = await welcomenft.PR5();

    setaddpr1(p1);
    setaddpr2(p2);
    setaddpr3(p3);
    setaddpr4(p4);
    setaddpr5(p5);

    console.log(p1);
    console.log(p2);
    console.log(p3);
    console.log(p4);
    console.log(p5);

    let countPR1 = await welcomenft.countPR(p1);
    let countPR2 = await welcomenft.countPR(p2);
    let countPR3 = await welcomenft.countPR(p3);
    let countPR4 = await welcomenft.countPR(p4);
    let countPR5 = await welcomenft.countPR(p5);

    setpr1(countPR1 / 1);
    setpr2(countPR2 / 1);
    setpr3(countPR3 / 1);
    setpr4(countPR4 / 1);
    setpr5(countPR5 / 1);

    console.log(countPR1);
    console.log(countPR2);
    console.log(countPR3);
    console.log(countPR4);
    console.log(countPR5);
  }

  if (connected == false) {
    console.log("not connected");

    return (
      <div className="page-container">
        <Helmet>
          <title>sekanson mint</title>
          <meta property="og:title" content="sekanson mint" />
        </Helmet>
        <div className="page-frame23">
          <div className="page-container1">
            <div className="page-container2">
              {/* <button className="page-button button" onClick = {connection} >CONNECT </button> */}
              <WalletConnect />
            </div>
          </div>
        </div>
        <div className="page-social-bar">
          <svg viewBox="0 0 950.8571428571428 1024" className="page-icon">
            <path d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
          </svg>
          <svg viewBox="0 0 877.7142857142857 1024" className="page-icon02">
            <path d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"></path>
          </svg>
          <svg viewBox="0 0 602.2582857142856 1024" className="page-icon04">
            <path d="M548 6.857v150.857h-89.714c-70.286 0-83.429 33.714-83.429 82.286v108h167.429l-22.286 169.143h-145.143v433.714h-174.857v-433.714h-145.714v-169.143h145.714v-124.571c0-144.571 88.571-223.429 217.714-223.429 61.714 0 114.857 4.571 130.286 6.857z"></path>
          </svg>
          <svg viewBox="0 0 877.7142857142857 1024" className="page-icon06">
            <path d="M585.143 857.143c-5.714-33.143-27.429-147.429-80-284.571-0.571 0-1.714 0.571-2.286 0.571 0 0-222.286 77.714-294.286 234.286-3.429-2.857-8.571-6.286-8.571-6.286 65.143 53.143 148 85.714 238.857 85.714 52 0 101.143-10.857 146.286-29.714zM479.429 510.286c-9.143-21.143-19.429-42.286-30.286-63.429-193.143 57.714-378.286 53.143-384.571 53.143-0.571 4-0.571 8-0.571 12 0 96 36.571 184 96 250.286v0c102.286-182.286 304.571-247.429 304.571-247.429 5.143-1.714 10.286-2.857 14.857-4.571zM418.286 389.143c-65.143-115.429-134.286-209.143-139.429-216-104.571 49.143-182.286 145.714-206.857 261.714 9.714 0 166.286 1.714 346.286-45.714zM809.143 571.429c-8-2.286-112.571-35.429-233.714-16.571 49.143 135.429 69.143 245.714 73.143 268 84-56.571 143.429-146.857 160.571-251.429zM349.143 148c-0.571 0-0.571 0-1.143 0.571 0 0 0.571-0.571 1.143-0.571zM686.286 230.857c-65.714-58.286-152.571-93.714-247.429-93.714-30.286 0-60 4-88.571 10.857 5.714 7.429 76.571 100.571 140.571 218.286 141.143-52.571 194.286-133.714 195.429-135.429zM813.714 508c-1.143-88.571-32.571-170.286-85.143-234.286-1.143 1.143-61.143 88-209.143 148.571 8.571 17.714 17.143 36 25.143 54.286 2.857 6.286 5.143 13.143 8 19.429 129.143-16.571 256.571 11.429 261.143 12zM877.714 512c0 242.286-196.571 438.857-438.857 438.857s-438.857-196.571-438.857-438.857 196.571-438.857 438.857-438.857 438.857 196.571 438.857 438.857z"></path>
          </svg>
          <svg viewBox="0 0 1024 1024" className="page-icon08">
            <path d="M1013.8 307.2c0 0-10-70.6-40.8-101.6-39-40.8-82.6-41-102.6-43.4-143.2-10.4-358.2-10.4-358.2-10.4h-0.4c0 0-215 0-358.2 10.4-20 2.4-63.6 2.6-102.6 43.4-30.8 31-40.6 101.6-40.6 101.6s-10.2 82.8-10.2 165.8v77.6c0 82.8 10.2 165.8 10.2 165.8s10 70.6 40.6 101.6c39 40.8 90.2 39.4 113 43.8 82 7.8 348.2 10.2 348.2 10.2s215.2-0.4 358.4-10.6c20-2.4 63.6-2.6 102.6-43.4 30.8-31 40.8-101.6 40.8-101.6s10.2-82.8 10.2-165.8v-77.6c-0.2-82.8-10.4-165.8-10.4-165.8zM406.2 644.8v-287.8l276.6 144.4-276.6 143.4z"></path>
          </svg>
        </div>
      </div>
    );
  } else if (connected == true) {
    console.log("connection true");
        if(data_obtained == false){
          connection();
        }

    return (


      <div className="desktop9-container">
        <Helmet>
          <title>sekanson mint</title>
        </Helmet>
        <div className="desktop9-desktop9">

          <div className="desktop9-frame7">
            <span className="desktop9-text">MENU</span>
            <div className="desktop9-frame3">
              <div className="desktop9-frame1">
                <div className="desktop9-home2">
                  <div className="desktop9-vuesaxlinearhome2">

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="desktop9-frame8"></div>
          <div className="desktop9-frame12">
            <span className="desktop9-text01">Dashboard Overview</span>
            <span className="desktop9-text01">{userAccount}</span>
          </div>

          <div className="desktop9-frame26">
            <div className="desktop9-frame24">
              <div className="desktop9-frame19">
                <span className="desktop9-text02">Nft minted</span>
                <button
                className="DisConnectButton"
                  onClick={() => {
                    connector?.onDisconnect();
                    }}
                >
                  Disconnect
                </button>
              </div>

            </div>
            <div className="desktop9-frame25">
              <div className="desktop9-container1">
                <span className="desktop9-text03">
                  Your fee from referral: {money} matic
                </span>

                <div className="desktop9-frame191"></div>
              </div>
              <div className="desktop9-container2">
                <div className="desktop9-container3">
                  <button className="desktop9-button button" onClick={retire_r}>
                    Claim
                  </button>
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
              {whitelist && <div>{renderlist()}</div>}
            </div>
          </div>
          <div className="desktop9-frame4273195851">
            <div className="desktop9-frame427319584">
              <span className="desktop9-text16">Referral </span>
            </div>



            <div className="desktop9-container4">


              <div>
                <input
                  type="text"
                  placeholder="Enter  Valid address"
                  className="desktop9-textinput input"
                  id="_ID_url"
                  value={_ID_url}
                />
                <div>

                    {check1 == false && (
                      <img className="check_img1" id="my image" src={ok} alt="ok" />
                    )}

                    {check1 == true && (
                      <img className="check_img1" id="my image" src={not} alt="ok" />
                    )}
                </div>


              </div>



              <div>
                <input
                  type="text"
                  placeholder="Enter Valid address"
                  className="desktop9-textinput1 input"
                  id="_ID_url2"
                  value={_ID_url2}
                />


              </div>

              <div >
                  {check2 == false && (
                    <img className="check_img2" id="my image" src={ok} alt="ok" />
                  )}

                  {check2 == true && (
                    <img className="check_img2" id="my image" src={not} alt="ok" />
                  )}

              </div>


            </div>



            <button className="desktop9-button1 button" onClick={returndata}>
                  Mint{" "}
            </button>





            {nft_cost && (
              <div className="whitetext">NFT COST: {nft_cost} matic</div>
            )}

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
                {addpr5 && (
                  <table id="myTable">
                    <td>
                      <tr>
                        <b> # </b>
                      </tr>
                      <tr>1</tr>
                      <tr>2</tr>
                      <tr>3</tr>
                      <tr>4</tr>
                      <tr>5</tr>
                    </td>
                    <td>
                      <tr>
                        <b>PR</b>
                      </tr>
                      <tr>{addpr1}</tr>
                      <tr>{addpr2}</tr>
                      <tr>{addpr3}</tr>
                      <tr>{addpr4}</tr>
                      <tr>{addpr5}</tr>
                    </td>
                    <td>
                      <tr>
                        <b>REFERRAL MINTED</b>
                      </tr>
                      <tr>{pr1}</tr>
                      <tr>{pr2}</tr>
                      <tr>{pr3}</tr>
                      <tr>{pr4}</tr>
                      <tr>{pr5}</tr>
                    </td>
                  </table>
                )}
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
          <button className="desktop9-button6 button" onClick={resetconn}>
            Reset
          </button>
        </div>
      </div>
    );
  }
};

export default Home;
