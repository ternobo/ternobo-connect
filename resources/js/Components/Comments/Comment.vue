<template>
    <div class="comment">
        <div class="container">
            <!-- write comment box row -->
            <div class="d-flex">
                <div>
                    <!-- dropdown profile -->
                    efafaef
                </div>

                <input type="text" placeholder="نظر خود را بنویسید" class="w-100 inputCm px-3">
            </div>
            <!-- /write comment box row-->


            <div class="bg-white mt-3">
                <div class="row py-2 border-bottom mx-3">
                    <div class="col-7 d-flex">
                        <img src="https://www.pinclipart.com/picdir/middle/355-3553881_stockvader-predicted-adig-user-profile-icon-png-clipart.png" class="rounded-circle picPro">
                        <div class="pr-2 d-flex flex-column discripPro">
                            <span class="name">سروش تن زاده</span>
                            <span class="roll">مدیر ارشد فناوری ترنوبو</span>
                        </div>
                    </div>
                    <div class="col-5">
                        <div class="float-left" >
                            <span>ساعت ۱</span>
                            <span style="font-size:21px" class="material-icons">more_vert</span>
                        </div>


                    </div>

                </div>
                <div class="mx-3 py-3 text-justify">
                    <span >
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان
                    </span>
                </div>


            </div>
            <div>
                <span>
                   پسندیده شده توسط آرمان رضوی زاده، فرناز فهیمی و
                </span>
                <span class="material-icons float-left">
                    insert_comment
                </span>
                <span class="material-icons float-left">
                    favorite_border
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Comment"
}
</script>

<style scoped>
    .inputCm{
        border: none;
        height: 2.5rem;
        direction: rtl;
    }
    .picPro{
        width: 48px;
        height: 48px;
    }
    @media only screen and (max-width: 600px) {
        .roll{
            font-size: 0.4rem;
        }
        .name{
            font-size: 0.7rem;
        }
        .discripPro{
            margin: auto 0;
        }
}
</style>