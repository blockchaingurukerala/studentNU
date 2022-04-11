// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;
contract Student{   
      
    uint public id=0; 
     mapping(uint=>string) public studentnames;
     function register( string memory _name)  public {
         id=id+1;
        studentnames[id]=_name;        
     }   

  
}
