<?php

$currentTime = time();

$returnStr = <<<EOD
<ul class="dropdown-menu dropdown-messages"
                    	data-blapy-container="true"
						data-blapy-container-name="messagesList"
						data-blapy-container-content="messagesListValues-$currentTime"
						data-blapy-update="json"
            data-blapy-template-init-purejson="0"
>
	[
		{firstname: "John",	lastname: "Smith", 	date:'Yesterday', message:'Hello,<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...'},
		{firstname: "Bob",	lastname: "Dylan", 	date:'Yesterday', message:'Hello,<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...'},
		{firstname: "Peter",lastname: "Rabbit", date:'Yesterday', message:'Hello,<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...'},
		{firstname: "Nina",	lastname: "Hagen", 	date:'Yesterday', message:'Hello,<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...'},
	]
</ul>

<ul class="dropdown-menu dropdown-tasks"
	                   	data-blapy-container="true"
						data-blapy-container-name="tasksList"
						data-blapy-container-content="tasksListValues-$currentTime"
						data-blapy-update="json"
>
	[
		{taskId: "Blapy Task 1",completeness: "40",statusTask:"success"},
		{taskId: "Blapy Task 2",completeness: "20",statusTask:"info"},
		{taskId: "Blapy Task 3",completeness: "60",statusTask:"warning"},
		{taskId: "Blapy Task 4",completeness: "80",statusTask:"danger"},
	]
</ul>

<ul class="dropdown-menu dropdown-alerts"  style="margin-top: 42px;"
	                   	data-blapy-container="true"
						data-blapy-container-name="alertsList"
						data-blapy-container-content="alertsListValues-$currentTime"
						data-blapy-update="json"
					>
	[
		{alertType:"comment",alertTitle:"New Comment",alertElapsedTime:"4 minutes ago"},
		{alertType:"twitter",alertTitle:"3 New Followers",alertElapsedTime:"12 minutes ago"},
		{alertType:"envelope",alertTitle:"Message Sent",alertElapsedTime:"4 minutes ago"},
		{alertType:"tasks",alertTitle:"New Task",alertElapsedTime:"6 minutes ago"},
		{alertType:"upload",alertTitle:"Server Rebooted",alertElapsedTime:"40 minutes ago"},
		]
</ul>

<ul class="dropdown-menu dropdown-user"
	data-blapy-container="true"
	data-blapy-container-name="userFeaturesList"
	data-blapy-container-content="userFeaturesListInit"
	data-blapy-update="json"
>
	[
		{featureIcon:"user",class:"",feature:"User Profile",url:"http://www.intersel.fr"},
		{featureIcon:"gear",class:"",feature:"Settings",url:"#"},
		{featureIcon:"",class:"divider",feature:"",url:"#"},
		{featureIcon:"sign-out",class:"",feature:"Logout",url:"#"},
	]
</ul>

<div class="huge"
	data-blapy-container="true"
	data-blapy-container-name="nbNewComments"
	data-blapy-container-content="nbNewComments-$currentTime"
>26</div>

<div class="huge"
	data-blapy-container="true"
	data-blapy-container-name="nbNewTasks"
	data-blapy-container-content="nbNewTasks-$currentTime"
>12</div>

<div class="huge"
	data-blapy-container="true"
	data-blapy-container-name="nbNewOrders"
	data-blapy-container-content="nbNewOrders-$currentTime"
>124</div>

<div class="huge"
	data-blapy-container="true"
	data-blapy-container-name="nbNewTickets"
	data-blapy-container-content="nbNewTickets-$currentTime"
>13</div>


<ul class="nav" id="side-menu"
		data-blapy-container="true"
		data-blapy-container-name="sideMenusList"
		data-blapy-container-content="sideMenusListInit"
		data-blapy-update="json"
>
[
			{subMenuContent:'<div class="input-group custom-search-form">
                                <input type="text" class="form-control" placeholder="Search...">
                                <span class="input-group-btn">
                                <button class="btn btn-default" type="button">
                                    <i class="fa fa-search"></i>
                                </button>
                            </span>
                            </div>
					 ',
			 liInfo:'class="sidebar-search"'
			},
			{liInfo:'',subMenuContent:'<a href="index.php"><i class="fa fa-dashboard fa-fw"></i> Dashboard</a>'},
			{liInfo:'',subMenuContent:'<a href="#"><i class="fa fa-bar-chart-o fa-fw"></i> Charts<span class="fa arrow"></span></a>
                            <ul id="UIChartsList" class="nav nav-second-level"
		                        data-blapy-container="true"
								data-blapy-container-name="UIChartsList"
								data-blapy-container-content="UIChartsListInit"
								data-blapy-update="json"
								data-blapy-template-init="phpAPI/subMenus.php"
								>
                                <li>
                                    <a href="$\{menuURL\}">$\{menuTitle\}</a>
                                </li>
                            </ul>

			'},
			{liInfo:'',subMenuContent:'<a href="tables.html"><i class="fa fa-table fa-fw"></i> Tables</a>'},
			{liInfo:'',subMenuContent:'<a href="forms.html"><i class="fa fa-edit fa-fw"></i> Forms</a>'},
			{liInfo:'',subMenuContent:'<a href="#"><i class="fa fa-wrench fa-fw"></i> UI Elements<span class="fa arrow"></span></a>
                            <ul id="UIElementsList"
														class="nav nav-second-level"
		                        data-blapy-container="true"
								data-blapy-container-name="UIElementsList"
								data-blapy-container-content="UIElementsListInit"
								data-blapy-update="json"
								>
                                <li>
                                    <a href="$\{menuURL\}">$\{menuTitle\}</a>
                                </li>
                            </ul>
                                    		'},
			{liInfo:'',subMenuContent:'<a href="#"><i class="fa fa-sitemap fa-fw"></i> Multi-Level Dropdown<span class="fa arrow"></span></a>
                            <ul class="nav nav-second-level">
                                <li>
                                    <a href="#">Second Level Item</a>
                                </li>
                                <li>
                                    <a href="#">Second Level Item</a>
                                </li>
                                <li>
                                    <a href="#">Third Level <span class="fa arrow"></span></a>
                                    <ul class="nav nav-third-level">
                                        <li>
                                            <a href="#">Third Level Item</a>
                                        </li>
                                        <li>
                                            <a href="#">Third Level Item</a>
                                        </li>
                                        <li>
                                            <a href="#">Third Level Item</a>
                                        </li>
                                        <li>
                                            <a href="#">Third Level Item</a>
                                        </li>
                                    </ul>
                                    <!-- /.nav-third-level -->
                                </li>
                            </ul>
                                    		'},
				{liInfo:'',subMenuContent:'<a href="#"><i class="fa fa-files-o fa-fw"></i> Sample Pages<span class="fa arrow"></span></a>
                            <ul class="nav nav-second-level">
                                <li>
                                    <a href="blank.html">Blank Page</a>
                                </li>
                                <li>
                                    <a href="login.html">Login Page</a>
                                </li>
                            </ul>
                            '},
			]
</ul>
<ul class="dropdown-menu pull-right" role="menu"
	data-blapy-container="true"
	data-blapy-container-name="areaChart"
	data-blapy-container-content="areaChartVoid"
>
	[
		{class: "",url: "#",action:"Action"},
		{class: "",url: "#",action:"Another action"},
		{class: "",url: "#",action:"Something else here"},
		{class: "divider",url: "#",action:""},
		{class: "",url: "#",action:"Separated link"},
	]
</ul>

<ul class="dropdown-menu pull-right" role="menu"
	data-blapy-container="true"
	data-blapy-container-name="barChartExampleMenu"
	data-blapy-container-content="barChartExampleMenuVoid"
	data-blapy-update="json"
>
	[
		{class: "",url: "#",action:"BCE- Action"},
		{class: "",url: "#",action:"BCE- Action Not Shown",dontdisplay:'1'},
		{class: "",url: "#",action:"BCE- Another action"},
		{class: "",url: "#",action:"BCE- Something else here"},
		{class: "divider",url: "#",action:""},
		{class: "",url: "#",action:"Separated link"},
	]
</ul>


EOD;

$returnStr=str_replace("\n",'',$returnStr);

include('callActions.php');
