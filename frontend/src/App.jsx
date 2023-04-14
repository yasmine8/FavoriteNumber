import React ,{useState ,useEffect} from 'react';
import { Route, Routes} from 'react-router-dom';
import { ethers } from "ethers";
import Wallet from '../../backend/artifacts/contracts/FavoriteNumber.sol/FavoriteNumber.json'
import { Flex, Input, Text, Button, Heading, Alert, AlertIcon, useToast, Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { TbCurrencyEthereum } from "react-icons/tb"

const WalletAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

import {Navbar} from './components'
import {FavNumber} from './pages'

function App() {
  const [wAddress, setWAddress] = useState("");
  const [favoriteNumberInput, setFavoriteNumberInput] = useState(null)
  const [favoriteNumberInBlockchain, setFavoriteNumberInBlockchain] = useState(null)

  useEffect(() => {
    getCurrentWalletConnected();
    getDatas();
  }, [])

  const getDatas  = async() => {
    console.log("typeof window.ethereum " +typeof window.ethereum);
    if(typeof window.ethereum !== 'undefined') {
      //const accounts = await window.ethereum.request({method:'eth_requestAccounts'});
      //const provider = new ethers.provider.Web3Provider(window.ethereum);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(WalletAddress, Wallet.abi, provider);
      try {
        
        //const data = await contract.getNumber(overrides);
        const data = await contract.getNumber();
        console.log("data" +data);
        setFavoriteNumberInBlockchain(data.toString());
      }
      catch(err) {
        setError('There is an error.');
      }
    }
  }

  const changeFavoriteNumber = async() => {
    console.log("amount send " + favoriteNumberInput);
    if (!favoriteNumberInput) {
      return;
    }
    if(typeof window.ethereum !== 'undefined') {
     // const accounts = await window.ethereum.request({method:'eth_requestAccounts'});
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
    
    try {
        //const contract = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", Contract.abi, signer)
       // const provider = new ethers.providers.Web3Provider(window.ethereum);
       const contract = new ethers.Contract(WalletAddress, Wallet.abi, signer);
       
        let transaction = await contract.setNumber(favoriteNumberInput);
        await transaction.wait(1);
        getDatas();
        setFavoriteNumberInput("");
        console.log("You changed your favorite number !");
    }
    catch {
        console.log("There is an error");
    }  

  }
  }
  
  const connectToWallet = async() => {
    if(typeof window.ethereum !== 'undefined') {
      try{
        const accounts = await window.ethereum.request({method:'eth_requestAccounts'});
        setWAddress(accounts[0]);
        console.log(accounts[0]);
      } catch(err){
        console.error(err);
      }
    }else{

    }
  }
  const getCurrentWalletConnected = async() => {
    if(typeof window.ethereum !== 'undefined') {
      try{
        const accounts = await window.ethereum.request({method:'eth_accounts'});
        if (accounts.length>0) {
          setWAddress(accounts[0]);
          console.log(accounts[0]);
        }else{
          console.log("Connect to Metamask using the connect button");
        }
      } catch(err){
        console.error(err);
      }
    }else{

    }
  }
  return (
    <div className="App">
      <Flex
        height='15vh'
            p="2rem"
            justifyContent="space-between"
            alignItems="center"
        >
            <TbCurrencyEthereum size={70}  color="teal" />

            <Button colorScheme='teal' size='md' onClick={() => connectToWallet()}>
              {wAddress.length>0 
                  ? `Connected: ${wAddress.substring(0,6)}...${wAddress.substring(38)}`
                  : "Connect Wallet"
                }
            </Button>
        </Flex>
      
      <Flex
            p="2rem"
            justifyContent="center"
            alignItems="center"
            height='85vh'
        >
            {wAddress.length>0 ? (
                <Flex direction="column" width="100%">
                    <Card p="2rem">
                        <CardBody>
                            <Heading as='h2' size='xl' align="center">Get your favorite number in the Blockchain</Heading>
                            <Text mt="1rem" align="center">Your favorite number is : <Text as="span" fontWeight="bold">{favoriteNumberInBlockchain}</Text></Text>
                        </CardBody>
                    </Card>
                    <Card p="2rem" mt="2rem">
                        <CardBody>
                            <Heading as='h2' size='xl' align="center">Change your favorite number in the Blockchain</Heading>
                            <Input mt="1rem" placeholder="Your favorite number" onChange={(e) => setFavoriteNumberInput(e.target.value)} />
                            <Button   width="100%" mt="1rem" colorScheme="teal" onClick={() => changeFavoriteNumber()} value={favoriteNumberInput}>Change</Button>
                        </CardBody>
                    </Card>
                </Flex>
            ) : (
                <Alert status='warning'>
                    <AlertIcon />
                    Please connect your Wallet
                </Alert>
            )}            
        </Flex>
    </div>
  )
}

export default App
