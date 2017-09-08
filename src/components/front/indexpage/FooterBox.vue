<template>
    <div class="footerBox">
        <div class="footerTitle">
            Copyright © 2017 黄明照--一个在路上慢慢行走的前端人
        </div>
        <div class="footerAdmin">
            <router-link to="/admin">后台登录</router-link>
        </div>
    </div>
</template>
<style>
    .footerBox{
        width: 100%;
        height: 1rem;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .footerTitle{
        line-height: 1rem;
        text-align: center;
    }
    .footerAdmin{
        line-height: 1rem;
        text-align: center;
    }

    @media screen and (min-width: 450px) {
        .footerBox {
           flex-direction: row;
        }
        .footerTitle{
            margin-left: 0.5rem;
        }
        .footerAdmin{
            margin-right: 0.5rem;
        }
    }
</style>