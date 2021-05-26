import React from 'react';

export default function Dash(){

    return(
        <div>


<div class="w3-bar w3-top w3-black w3-large" style={{"background":"black"}} >
<span class="w3-bar-item w3-left"><b>WB</b> Advocacia</span>
  <button class="w3-bar-item w3-button w3-hide-large w3-hover-none w3-hover-text-light-grey" ><i class="fa fa-bars"></i>  Menu</button>
  
</div>

<nav class="w3-sidebar w3-collapse w3-white w3-animate-left" id="mySidebar" style={{"margin-top":"45px"}}><br/>
  <div class="w3-container w3-row">
    <div class="w3-col s4">
      <img  class="w3-circle w3-margin-right" />
    </div>
    <div class="w3-col s8 w3-bar" style={{"background":"transparent"}}>
      <span>Bem vindo, <strong> </strong></span><br/>
      <a href="#" class="w3-bar-item w3-button"><i class="fa fa-envelope"></i></a>
      <a href="#" class="w3-bar-item w3-button"><i class="fa fa-user"></i></a>
      <a href="#" class="w3-bar-item w3-button"><i class="fa fa-cog"></i></a>
    </div>
  </div>
  <hr/>
  <div class="w3-container">
    <h5>Menu</h5>
  </div>
  <div class="w3-bar-block">
   
    <a href="#" class="w3-bar-item w3-button w3-padding-16 w3-hide-large w3-dark-grey w3-hover-black"  title="close menu"><i class="fa fa-remove fa-fw"></i>  Fechar </a>
    <a href="#" class="w3-bar-item w3-button w3-padding w3-blue"><i class="fa fa-diamond fa-fw"></i>  Inicio </a>
    <a href="#tabelaClientes"  class="w3-bar-item w3-button w3-padding "><i class="fa fa-users fa-fw"></i> Clientes </a>
    <a href="#tabelaCasos"  class="w3-bar-item w3-button w3-padding"><i class="fa fa-address-card-o fa-fw"></i>  Casos </a>
    <a href="#tabelaAgenda"  class="w3-bar-item w3-button w3-padding"><i class="fa fa-calendar-o fa-fw"></i>  Agendamentos </a>
    <a href="#tabelaPosts"  class="w3-bar-item w3-button w3-padding"><i class="fa fa-file fa-fw"></i>  Posts </a>
    <a href="#" class="w3-bar-item w3-button w3-padding"><i class="fa fa-search fa-fw"></i>  Pesquisa</a>
    
  </div>
</nav>



<div class="w3-overlay w3-hide-large w3-animate-opacity"  title="close side menu" id="myOverlay"></div>


<div class="w3-main">


  <header class="w3-container" >
    <h5><b><i class="fa fa-dashboard"></i> Painel </b></h5>
  </header>

  <div class="w3-row-padding w3-margin-bottom">
 
    <div class="w3-quarter" >
    <a href="#tabelaCasos">
      <div class="w3-container w3-red w3-padding-16">
        <div class="w3-left"><i class="fa fa-address-card-o w3-xxxlarge"></i></div>
        <div class="w3-right">
         
        </div>
        <div class="w3-clear"></div>
        <h4> Casos </h4>
      </div>
      </a>
    </div>
   
    <div class="w3-quarter"  >
    <a href="#tabelaClientes">
      <div class="w3-container w3-blue w3-padding-16">
        <div class="w3-left"><i class="fa fa-users w3-xxxlarge"></i></div>
        <div class="w3-right">
         
        </div>
        <div class="w3-clear"></div>
        <h4>Clientes</h4>
      </div>
      </a>
    </div>

   
   
    <div class="w3-quarter" >
    <a href="#tabelaAgenda">
      <div class="w3-container w3-teal w3-padding-16">
        <div class="w3-left"><i class="fa fa-calendar-o w3-xxxlarge"></i></div>
        <div class="w3-right">
          
        </div>
        <div class="w3-clear"></div>
        <h4>Agendamentos</h4>
      </div>
      </a>
    </div>
    <div class="w3-quarter" >
    <a href="#tabelaPosts">
      <div class="w3-container w3-orange w3-text-white w3-padding-16">
        <div class="w3-left"><i class="fa fa-file w3-xxxlarge"></i></div>
        <div class="w3-right">
         
        </div>
        <div class="w3-clear"></div>
        <h4>Posts</h4>
      </div>
      </a>
    </div>
  </div>


  







  
  <hr/>
 
 

 
</div>


        </div>
    );
}