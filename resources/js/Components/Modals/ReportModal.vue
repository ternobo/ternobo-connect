<template>
	<b-modal v-model="showModal" hide-footer body-class="report-modal" size="md" title="چرا می‌‌خواهید این محتوا را گزارش دهید؟" :centered="true">
		<div class="reportreseaons" v-if="reportFor == null">
			<div class="report-item" @click="(reportFor = 'notrelated'), (reason = 'نامرتبط با ترنوبو')">
				<span class="text">فکر می‌کنم <span class="reportTitle">این محتوا</span> مناسب ترنوبو نیست</span>
				<i class="material-icons">keyboard_arrow_left</i>
			</div>
			<div class="report-item" @click="reportFor = 'fakeorspam'">
				<span class="text">فکر می‌کنم <span class="reportTitle">این محتوا</span> جعلی، هرز یا کلاهبراری است‌</span>
				<i class="material-icons">keyboard_arrow_left</i>
			</div>
			<div class="report-item" @click="reportFor = 'other-reasons'">
				<span class="text">برای گزارش <span class="reportTitle">این محتوا</span> دلایل دیگری دارم</span>
				<i class="material-icons">keyboard_arrow_left</i>
			</div>
		</div>

		<div v-if="!moreInfo">
			<!-- Fake Reason !-->
			<div class="fakeorspam reportfor" v-if="reportFor === 'fakeorspam'">
				<div class="report-reason">
					<label for="fakeaccount">
						<span>فکر می‌کنم این حساب کاربری غیرواقعی است</span>
						<small class="text-muted">مثال : گزارش حساب ساختگی یا جعل شده</small>
					</label>

					<div class="md-checkbox" @click="reason = 'فکر می‌کنم این حساب کاربری غیرواقعی است'">
						<input type="radio" name="reason" value="فکر می‌کنم این حساب کاربری غیرواقعی است" v-model="reason" />
						<label> </label>
					</div>
				</div>
				<div class="report-reason">
					<label for="wronginformation">
						<span>فکر می‌کنم <span class="reportTitle">این صفحه</span> دارای اطلاعات نادرست است</span>
						<small class="text-muted">مثال : اطلاعات ارائه شده در <span class="reportTitle">این صفحه</span> نادرست بوده و تحت عنوان اطلاعت درست و واقعی ارائه شده است</small>
					</label>

					<div class="md-checkbox" @click="reason = 'فکر می‌‌کنم این صفحه دارای اطلاعات نادرست است'">
						<input type="radio" name="reason" value="فکر می‌‌کنم این صفحه دارای اطلاعات نادرست است" v-model="reason" />
						<label> </label>
					</div>
				</div>
				<div class="report-reason">
					<label for="spamcotent">
						<span>فکر می‌کنم <span class="reportTitle">این صفحه</span> هرز است</span>
						<small class="text-muted">مثال : <span class="reportTitle">این صفحه</span> دارای ارزش خاصی نمی‌باشد و صرفا جهت جذب بازدید ارائه شده است</small>
					</label>
					<div class="md-checkbox" @click="reason = 'فکر می این صفحه هرز است'">
						<input type="radio" name="reason" value="فکر می این صفحه هرز است" v-model="reason" />
						<label> </label>
					</div>
				</div>
				<div class="report-reason">
					<label for="phisingorvirus">
						<span>فکر می‌کنم <span class="reportTitle">این صفحه</span> جهت کلاهبرداری، فیشینگ یا انتقال ویروس و باج افزار ارائه شده‌</span>
						<small class="text-muted">مثال : <span class="reportTitle">این صفحه</span> به جهت دریافت اطلاعات شخصی، پول یا ارائه لینک‌های مشکوک و آلوده قرار گرفته است.</small>
					</label>
					<div class="md-checkbox" @click="reason = 'فکر می‌‌کنم این صفحه جهت کلاهبرداری، فیشینگ یا انتقال ویروس و باج افزار ارائه شده'">
						<input type="radio" name="reason" value="فکر می‌‌کنم این صفحه جهت کلاهبرداری، فیشینگ یا انتقال ویروس و باج افزار ارائه شده" v-model="reason" />
						<label> </label>
					</div>
				</div>
			</div>

			<!-- other Reasons !-->
			<div class="other-reasons reportfor" v-if="reportFor === 'other-reasons'">
				<div class="report-reason">
					<label for="hatewordsreport">
						<span>فکر می‌کنم <span class="reportTitle">این صفحه</span> توهین آمیز است</span>
						<small class="text-muted">مثال : <span class="reportTitle">این صفحه</span> به صوتر هدفمند به اشخصا حقیقی، قومیت یا مذهبی خاص توهین کرده است</small>
					</label>

					<div class="md-checkbox" @click="reason = 'فکر می‌کنم این صفحه توهین آمیز است'">
						<input type="radio" name="reason" value="فکر می‌کنم این صفحه توهین آمیز است" v-model="reason" />
						<label> </label>
					</div>
				</div>
				<div class="report-reason">
					<label for="sexualreport">
						<span>فکر می‌کنم شامل محتوای جنسی است</span>
						<small class="text-muted">مثال : شامل محتوای برهنگی، صحنه‌ها و زبان جنسی، فحشا یا قاچاق جنسی است</small>
					</label>
					<div class="md-checkbox" @click="reason = 'فکر می‌‌کنم شامل محتوای جنسی است'">
						<input type="radio" name="reason" value="فکر می‌‌کنم شامل محتوای جنسی است" v-model="reason" />
						<label> </label>
					</div>
				</div>
				<div class="report-reason">
					<label for="terorismreport">
						<span>فکر می‌کنم <span class="reportTitle">این صفحه</span> اشاعه دهنده خشونت و تروریسم است</span>
						<small class="text-muted">مثال : شامل شکنجه، تجاوز یا سوء استفاده، عمل تروریستی یا عضوگیری برای گروه‌های تروریستی است</small>
					</label>
					<div class="md-checkbox" @click="reason = 'فکر می‌کنم  این صفحه اشاعه دهنده خشونت و تروریسم است'">
						<input type="radio" name="reason" value="فکر می‌کنم  این صفحه اشاعه دهنده خشونت و تروریسم است" v-model="reason" />
						<label> </label>
					</div>
				</div>
				<div class="report-reason">
					<label for="threatandhatereport">
						<span>فکر می‌کنم <span class="reportTitle">این صفحه</span> آزار دهنده و تهدید آمیز است‌</span>
						<small class="text-muted">مثال : شامل حمله به شخص/اشخاص یا تهدید و قلدری است</small>
					</label>
					<div class="md-checkbox clickable" @click="reason = 'فکر می‌‌کنم این صفحه آزار دهنده و تهدید آمیز است'">
						<input type="radio" name="reason" value="فکر می‌‌کنم این صفحه آزار دهنده و تهدید آمیز است" v-model="reason" />
						<label> </label>
					</div>
				</div>
				<div class="report-reason">
					<label for="suicidereport">
						<span>من نگران هستم این فرد بخواهد خودکشی کند‌</span>
						<small class="text-muted">مثال : این شخص تهدید می‌کند که به خودش آسیب می‌رساند</small>
					</label>
					<div class="md-checkbox" @click="reason = 'من نگران هستم این فرد بخواهد خودکشی کند'">
						<input type="radio" name="reason" value="من نگران هستم این فرد بخواهد خودکشی کند" v-model="reason" />
						<label> </label>
					</div>
				</div>
				<div class="report-reason">
					<label for="copyrightreport">
						<span><span class="reportTitle">این صفحه</span> حقوق شخصی مرا نقض می‌کند‌‌</span>
						<small class="text-muted">مثال : اقتراء، نقص حقوق چاپ یا علائم تجاری است</small>
					</label>
					<div class="md-checkbox" @click="reason = 'این صفحه حقوق شخصی مرا نقض می‌کند'">
						<input type="radio" name="reason" value="این صفحه حقوق شخصی مرا نقض می‌کند" v-model="reason" />
						<label> </label>
					</div>
				</div>
			</div>

			<!-- Not Related To Ternobo Reason !-->
			<div class="notrelated reportfor px-3" v-if="reportFor === 'notrelated'">
				<label>از گزارش <span class="reportTitle">این صفحه</span> به عنوان محتوای نامناسب و نامرتبط اطمینان دارید؟</label>
				<input type="radio" name="report" checked value="نامرتبط با ترنوبو" style="display: none" />
			</div>
		</div>

		<div v-if="moreInfo">
			<div class="moreinfo">
				<textarea-autosize class="form-control" v-model="description" placeholder="توضیحات خود را اینجا بنویسید" name="moreinfo"></textarea-autosize>
			</div>
			<div class="moreinfo-footer text-left">
				<button class="btn text-muted btn-transparent" type="button" @click="(moreInfo = false), (description = null)">لغو</button>
				<button class="btn btn-dark" id="moreinfo-close" @click="moreInfo = false">افزودن</button>
			</div>
		</div>
		<div class="d-flex pt-3 justify-content-between" v-else-if="reportFor != null">
			<div class="align-self-start">
				<button class="btn btn-edit" @click="moreInfo = true">ارائه توضیحات</button>
			</div>
			<div class="d-flex">
				<button class="btn text-muted btn-transparent" @click="reportFor = null">برگشت</button>
				<loading-button :loading="loading" :disabled="reason == null" class="btn btn-primary" @click.native="submit">ثبت</loading-button>
			</div>
		</div>
	</b-modal>
</template>

<script>
import ModalMixin from "../../Mixins/Modal";
export default {
	props: {
		type: {
			type: String,
			default: "post",
			required: false,
		},
		postId: {
			type: Number,
			default: undefined,
			required: false,
		},
		commentId: {
			type: Number,
			default: undefined,
			required: false,
		},
	},
	mixins: [ModalMixin],

	methods: {
		setReason(val) {
			this.reason = val;
		},
		submit() {
			this.loading = true;
			let data = {
				report: this.reason,
			};
			if (this.type == "post") {
				data.post_id = this.postId;
			} else if (this.type == "comment") {
				data.comment_id = this.commentId;
			}
			axios
				.post("/reportpost", data)
				.then((response) => {
					if (response.data.result) {
						this.toast("درخواست شما با موفقیت ثبت شد", "check", "text-success");
						this.$emit("update:show", false);
					} else {
						this.handleError(response.data.errors);
					}
				})
				.catch((err) => this.toast("خطا در برقراری ارتباط"))
				.then(() => (this.loading = false));
		},
	},
	data() {
		return {
			reportFor: null,
			loading: false,
			description: null,
			moreInfo: false,
			reason: null,
		};
	},
};
</script>

<style></style>
