// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;
contract Student{   
      
    uint public id=0; 
    struct st{
        string name;
        string email;
        string ph;
    }
     mapping(uint=>st) public students;
     function register( string memory _name,string memory _email,string memory _ph)  public {
         id=id+1;
        students[id]=st(_name,_email,_ph)    ;   
     }   

  
}
