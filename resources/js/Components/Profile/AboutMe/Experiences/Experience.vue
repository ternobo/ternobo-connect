<template>
<div class="experience">
    <div class="actions" v-if="edit">
        <i class="material-icons sort">unfold_more</i>
        <i class="material-icons-outlined">delete</i>
    </div>
    <div class="detail">
        <div class="d-flex flex-column ml-3">
            <lazy-image src="/images/company-profile.png" class="profile-md mb-2" img-class="profile-md" />
            <button class="btn font-12 follow-btn" @click="showMore = !showMore" v-if="edit">
                {{ showMore ? "نمایش کمتر" : "نمایش بیشتر" }}
            </button>
        </div>
        <div class="mr-3 w-100" v-if="!edit">
            <strong class="text-dark">مدیر عامل و موسس</strong>
            <div class="d-flex aling-items-center">
                <span class="ml-2 text-dark"> ترنوبو | Ternobo </span>
                <span class="text-muted"> تیر ۱۳۹۴ تا امروز . 5 سال </span>
            </div>
            <p class="job-description my-2" :class="{ open: showMore }">
                لورم‌ساز داشبورد ابزارهای برنامه‌نویسی و گرافیکی تولید کننده لورم
                ایپسوم (پیشرفته) تولید کننده لورم ایپسوم ایجاد و ویرایش متن ویرایشگر
                زبان‌های برنامه‌نویسی فشرده‌سازی فایل‌های وب پالت انتخاب رنگ بندی
                تولید کننده رنگ گرادینت تخته وایت بورد ابزارهای کاربردی کوتاه کننده
                لینک تولید کننده رمز عبور تولید کننده کیو آر کُد ابزارهای محاسباتی و
                اندازه‌گیری ماشین حساب مبدل واحدهای اندازه‌گیری زمان‌سنج (کورنومتر)
                محاسبه شاخص توده بدنی (BMI) تبدیل اعداد به حروف انگلیسی تبدیل واحد
                پیکسل به EM/REM ابزارهای عمومی و سرگرمی بازی فکری جدول سودوکو بازی
                Pacman صدای حیوانات منظومه شمسی (3D) اسکرین سیور هکر Yektanet's
                Branding نمره آیلتس چند میشه ؟ رایگان تو سفیر امتحان بده و بفهم! نمره
                آیلتس چند میشه ؟ رایگان تو سفیر امتحان بده و بفهم! مشاهده لورم‌ساز
                مجله لورم ساز هواشناسی تماس با ما کتاب آزاد - تبادل دانش و تجربه تولید
                کننده لورم ایپسوم (پیشرفته) لورم ایپسوم متن ساختگی با تولید سادگی
                نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون
                بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی
                تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می
                باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
                جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای
                طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی
                ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در
                ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل
                حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود
                طراحی اساسا مورد استفاده قرار گیرد. لورم ایپسوم چیست؟ اگر شما یک طراح
                هستین و یا با طراحی های گرافیکی سروکار دارید به متن های برخورده اید که
                با نام لورم ایپسوم شناخته می‌شوند. لورم ایپسوم یا طرح‌نما (به انگلیسی:
                Lorem ipsum) متنی ساختگی و بدون معنی است که برای امتحان فونت و یا پر
                کردن فضا در یک طراحی گرافیکی و یا صنعت چاپ استفاده میشود. طراحان وب و
                گرافیک از این متن برای پرکردن صفحه و ارائه شکل کلی طرح استفاده
                می‌کنند. طراحان سایت هنگام طراحی قالب سایت معمولا با این موضوع رو برو
                هستند که محتوای اصلی صفحات آماده نیست. در نتیجه طرح کلی دید درستی به
                کار فرما نمیدهد. اگر طراح بخواهد دنبال متن های مرتبط بگردد تمرکزش از
                روی کار اصلی برداشته میشود و اینکار زمان بر خواهد بود. همچنین طراح به
                دنبال این است که پس از ارایه کار نظر دیگران را در مورد طراحی جویا شود
                و نمی‌خواهد افراد روی متن های موجود تمرکز کنند. از آنجا که لورم
                ایپسوم، شباهت زیادی به متن های واقعی دارد، طراحان معمولا از لورم
                ایپسوم استفاده میکنند تا فقط به مشتری یا کار فرما نشان دهند که قالب
                طراحی شده بعد از اینکه متن در آن قرار میگرد چگونه خواهد بود و فونت ها
                و اندازه ها چگونه در نظر گرفته شده است. نکته بعدی در مورد متن ساختگی
                لورم ایپسوم این است که بعضی از طراحان وبسایت و گرافیست کاران بعد از
                آنکه قالب و محتوای مورد نظرشون را ایجاد کردند از یاد می‌برند که متن
                لورم را از قسمتهای مختلف سایت حذف کنند و یا با متن دیگری جایگزین کنند.
                به همین دلیل اغلب اوقات ما با وبسایتهایی مواجه می‌شویم که در گوشه و
                کنار صفحات آنها متن لورم ایپسوم هنوز وجود دارد و حذف نشده است که این
                نشان دهنده بی توجهی طراحان است. لورم ایپسوم تولید خودکار لورم ایپسوم
                در ویرایشگر اگر در ویرایشگر کدنویسی پلاگین ایمت (emmet) نصب شده است
                می‌توانید از آن برای تولید خودکار لورم ایپسوم برای پر کردن فضای متنی
                استفاده کنید. شیوه قرار دادن لورم ایپسوم در پاراگراف شیوه قرار دادن
                لورم ایپسوم به صورت لیست شیوه قرار دادن لورم ایپسوم به صورت محتوای فیک
                در ماژول‌ها شیوه قرار دادن لورم ایپسوم به صورت یک محتوای کامل
            </p>
            <span class="clickable text-action" @click="showMore = !showMore">مشاهده {{ showMore ? "کمتر" : "بیشتر ..." }}</span>
        </div>
        <div class="row w-100 m-0" v-else>
            <div class="col-md-6 py-4">
                <MaterialTextField v-model="value.company" :required="true" class="d-flex align-items-center material--sm p-0 col-md-8" input-class="w-100" placeholder="شرکت"></MaterialTextField>
            </div>
            <div class="col-md-6 py-4">
                <MaterialTextField v-model="value.title" :required="true" class="d-flex align-items-center material--sm p-0 col-md-8" input-class="w-100" placeholder="سمت"></MaterialTextField>
            </div>
            <div class="col-md-6 py-4">
                <strong>تاریخ شروغ <span class="text-action">*</span></strong>
                <div class="col-md-6 p-0">
                    <date-picker v-model="value.startDate" type="year-month" color="#191919" :max="now" />
                </div>
            </div>
            <div class="col-md-6 py-4">
                <strong>تاریخ پایان <span class="text-action">*</span></strong>
                <div class="col-md-6 p-0">
                    <date-picker v-model="value.endDate" type="year-month" color="#191919" :max="now" />
                </div>
            </div>
            <div class="col-md-6 py-4" v-if="showMore">
                <v-select :placeholder="'نوع اشتغال'" class="w-75" dir="rtl" v-model="value.jobType" :options="[
              { label: 'تمام وقت', code: 'Full-Time' },
              { label: 'پاره وقت', code: 'Part-Time' },
              { label: 'کار آموزی', code: 'Internship' },
              { label: 'فریلنسر', code: 'Freelancer' },
              { label: 'فصلی', code: 'Seasonal' },
              { label: 'قراردادی', code: 'Contractual' },
            ]"></v-select>
            </div>
            <div class="col-md-6 py-4" v-if="showMore">
                <MaterialTextField v-model="value.location" class="d-flex align-items-center material--sm" placeholder="محل فعالیت"></MaterialTextField>
            </div>
            <div class="col-md-12 py-4" v-if="showMore">
                <strong>توضیحات</strong>
                <div class="character-counter">
                    <span class="counter tex-dark">{{ leftCharacter }}</span>
                    <div class="progress ml-1 mb-0" style="width: 100px;height: 5px;">
                        <div class="progress-bar" role="progressbar" :style="{ width : progress }" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
                <textarea-autosize class="form-control" v-model="value.description"></textarea-autosize>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import PersianDate from "persian-date";

import MaterialTextField from "../../../inputs/MaterialTextField";

export default {
    watch: {
        value: {
            handler(newValue) {
                this.$emit("input", newValue);
                this.progress = (((newValue.description.length / 2500)) * 100) + "%";
                this.leftCharacter = 2500 - newValue.description.length;
            },
            deep: true
        }
    },
    props: {
        edit: {
            type: Boolean,
            default: false,
            required: false,
        },
    },
    components: {
        MaterialTextField,
    },
    computed: {
        now() {
            return new PersianDate(new Date()).toLocale("en").format("L");
        },
    },
    data() {
        return {
            value: {
                company: "",
                title: "",
                location: "",
                jobType: undefined,
                startDate: null,
                endDate: null,
                description: "",
            },

            showMore: false,
            leftCharacter: 2500,
            progress: 0
        };
    },
};
</script>

<style lang="scss" scoped>
@import "../../../../../sass/application/variables";

.experience {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow-x: auto;

    .job-description {
        text-align: justify;
        max-height: 90px;
        overflow: hidden;
    }

    .job-description.open {
        max-height: unset;
    }

    .actions {
        border-radius: 32px;
        display: flex;
        flex-direction: column;
        color: $icons;
        background: $body-bg;
        height: max-content;
        padding: 2px;
        margin-left: 24px;
    }

    .detail {
        display: flex;
        width: 100%;
    }
}
</style>
