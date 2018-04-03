<template>
	<div id="app">
		<div class="wrap">
			<div class="header"></div>
			<div class="content">
				<div class="content-title">已报名
					<span class='pink'>200</span> 城市
					<span class='pink'>5387</span> 人
				</div>
				<div class="tab">
					<div class="left" v-bind:class="[flag_tab?'orange':'']">朗读课文大赛</div>
					<div class="right" v-bind:class="[flag_tab?'orange':'']">葛兰文化季</div>
				</div>
				<from class="formLeft">
					<div class="formLeft-item">
						<div class="item-name">姓<span class="space"></span>名</div>
						<input class='item-input' type="text" name="userName" id="" placeholder="请填写您的姓名" />
					</div>
					<div class="formLeft-item">
						<div class="item-name">性<span class='space'></span>别</div>
						<label for="man" class="radio-man">
							<input class="sex" type="radio" name="sex" id="man" value="男" checked=""/>
							<div class="sex-btn" v-bind:class="[flag_sex1==false?'':'sex-checked']">男</div>
						</label>
						<label for="woman" class="radio-woman">
							<input class="sex" type="radio" name="sex" id="woman" value="女" />
							<div class="sex-btn" v-bind:class="[flag_sex1==false?'sex-checked':'']">女</div>
						</label>
					</div>
					<div class="formLeft">
						<div class="item-name">民<span class="space"></span>族</div>
						<input type="text" name="nation" id="nation" value="" />
					</div>
				</from>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'App'
	}
	//var app = new Vue({
	//  el:'#app',
	//  data:{
	//    flag_tab: false
	//  }
	//})
</script>

<style>
	html {
		background-color: #f88bdf;
		font-family: '微软雅黑'；
	}
	
	.wrap {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
	}
	
	.header {
		width: 100%;
		height: 3.4rem;
	}
	
	.content {
		width: 8.66rem;
		margin: 0 auto 0.4rem;
		border-radius: 0.26rem;
		background: #fff;
		border: 0.01rem solid #f1ceca;
	}
	
	.content-title {
		font-size: 0.37rem;
		color: #5400ac;
		line-height: 1.45rem;
		text-align: center;
		font-weight: bold;
	}
	
	.pink {
		color: #f0f;
		font-size: 0.61rem;
	}
	
	.content .tab {
		display: flex;
		width: 5.33rem;
		height: 0.88rem;
		background-color: #f5f5f5;
		margin: 0.26rem auto 1.22rem;
		border-radius: 0.4rem;
		font-size: 0.29rem;
		line-height: 0.88rem;
		font-weight: bold;
	}
	
	.content .tab .left,
	.content .tab .right {
		width: 50%;
		text-align: center;
		border-radius: 0.4rem;
		color: #ff7800;
	}
	
	.content .tab .orange {
		background: -webkit-linear-gradient(left, #ff9a00 0%, #ffb700 40%, #ffd000 80%, #ffd000 100%);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(right, #ff9a00 0%, #ffb700 40%, #ffd000 80%, #ffd000 100%);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(right, #ff9a00 0%, #ffb700 40%, #ffd000 80%, #ffd000 100%);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(to right, #ff9a00 0%, #ffb700 40%, #ffd000 80%, #ffd000 100%);
		/* 标准的语法（必须放在最后） */
		color: #fff;
	}
	
	.formLeft {
		display: block;
		width: 6.8rem;
		margin: 0 auto;
	}
	
	.formLeft-item {
		display: flex;
		width: 100%;
		margin-bottom: 0.6rem;
	}
	
	.formLeft-item .item-name {
		width: 25%;
		font-size: 0.29rem;
		color: #595757;
		line-height: 0.66rem;
	}
	
	.formLeft-item .item-input {
		width: 75%;
		height: 0.66rem;
		border: 0.01rem solid #e1e1e1;
		border-radius: 0.09rem;
		font-size: 0.29rem;
		color: #595757;
		padding-left: 0.26rem;
		position: relative;
	}
	
	.formLeft-item .select:before {
		position: absolute;
		right: 0.25rem;
		bottom: 0.22rem;
		content: '';
		width: 0;
		height: 0;
		border-left: 0.13rem solid transparent;
		border-right: 0.13rem solid transparent;
		border-top: 0.17rem solid #e1e1e1;
	}
	
	.space {
		display: inline-block;
		width: 0.49rem;
	}
	
	.radio-man,
	.radio-woman {
		position: relative;
		width: 1.57rem;
		height: 0.69rem;
	}
	
	.radio-man {
		margin-right: 0.26rem;
	}
	
	.sex {
		width: 1.57rem;
	}
	
	.sex-btn {
		position: absolute;
		top: 0;
		width: 1.57rem;
		height: 0.73rem;
		border: 0.01rem solid #e1e1e1;
		border-radius: 0.09rem;
		background-color: #f5f5f5;
		font-size: 0.29rem;
		color: #bbbcbc;
		line-height: 0.73rem;
		text-align: center;
	}
	
	.radio-woman .sex-btn {
		left: 0;
	}
	
	.sex-checked {
		width: 1.6rem;
		height: 0.76rem;
		background: -webkit-linear-gradient(left, #f676ff 0%, #f990d7 40%, #fdb998 80%, #ffd075 100%);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(right, #f676ff 0%, #f990d7 40%, #fdb998 80%, #ffd075 100%);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(right, #f676ff 0%, #f990d7 40%, #fdb998 80%, #ffd075 100%);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(to right, #f676ff 0%, #f990d7 40%, #fdb998 80%, #ffd075 100%);
		/* 标准的语法（必须放在最后） */
		color: #fff;
		border: none;
	}
	
	.picker {
		width: 100%;
		height: 0.66rem;
		line-height: 0.66rem;
	}
	
	.form-submit {
		width: 3.46rem;
		height: 1.17rem;
		border-radius: 0.6rem;
		margin-top: 0.6rem;
		margin-bottom: 0.6rem;
		font-size: 0.4rem;
		color: #fff;
		background: -webkit-linear-gradient(left, #ff9a00 0%, #ffb700 40%, #ffd000 80%, #ffd000 100%);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(right, #ff9a00 0%, #ffb700 40%, #ffd000 80%, #ffd000 100%);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(right, #ff9a00 0%, #ffb700 40%, #ffd000 80%, #ffd000 100%);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(to right, #ff9a00 0%, #ffb700 40%, #ffd000 80%, #ffd000 100%);
		/* 标准的语法（必须放在最后）*/
		line-height: 1.17rem;
		font-weight: bold;
	}
	
	.form-submit::after {
		border: none;
	}
</style>