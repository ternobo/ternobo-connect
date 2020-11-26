<template>
  <base-layout>
    <div class="content-container-profile">
      <ProfileHeader :page="page" :can-edit="canEdit"></ProfileHeader>
      <tabs :compact="true" :disabled="edit" class="py-3" @selected="tabChange" :state-tab="true">
        <template slot="custom-item">
          <div class="d-flex align-items-center" v-if="canEdit && showEdit">
            <div class="ml-3 rounded-circle clickable" v-if="edit">
              <i class="material-icons text-muted hover-dark" v-if="edit" @click="cancelEdit">close</i>
            </div>
            <button class="btn d-flex align-items-center justify-content-center btn-edit" @click="doEdit">
              <span v-if="!edit"> {{ $root.isDesktop ? "ویرایش اطلاعات" : "" }} <i class="material-icons-outlined">edit</i> </span>
              <div class="d-flex align-items-center justify-content-center" v-else>
                {{ $root.isDesktop ? "ذخیره" : "" }}
                <i class="material-icons-outlined" v-if="!$root.isDesktop">save</i>
                <div style="height: 14px; width: 14px; border-width: 2px" v-if="loadingSave" class="mr-2 loadingspinner"></div>
              </div>
            </button>
          </div>
        </template>
        <tab v-if="hasAbout" name="درباره من" id="home" :href="'/' + page.slug" :selected="current_tab === 'home'">
          <div class="w-100 d-flex justify-content-center py-3" v-if="loadingTab">
            <loading-spinner class="image__spinner" />
          </div>
          <AboutTab v-else ref="about" :edit="edit" :page="page"></AboutTab>
        </tab>
        <tab v-if="hasActivity" name="فعالیت‌ها" id="activities" :href="'/' + page.slug + '/activities'" :selected="current_tab === 'activities'">
          <div class="row" v-if="!loadingTab" v-infinite-scroll="loadMore" infinite-scroll-distance="5">
            <div class="col-md-4" v-if="$root.isDesktop">
              <Categories :current-category="currentCategory" :categories="page.categories" :location="location" :slug="page.slug" :article="false"></Categories>
            </div>
            <div class="col-md-8">
              <NewPostCard v-if="canEdit"></NewPostCard>
              <div class="posts pt-3">
                <ActionCard v-for="action in actionsList" :page="page" :action="action" :key="action.id"></ActionCard>
              </div>
              <div class="w-100 d-flex justify-content-center py-3" v-if="loadingTab">
                <loading-spinner class="image__spinner" />
              </div>
              <div v-if="next_page_url === null && !loadingTab">
                <no-content></no-content>
              </div>
            </div>
          </div>
          <div class="w-100 d-flex justify-content-center py-3" v-if="loadingTab">
            <loading-spinner class="image__spinner" />
          </div>
        </tab>
        <tab name="تماس با من" id="contact" :href="'/' + page.slug + '/contact'" :selected="current_tab === 'contact'">
          <ContactTab ref="contacts" :edit="edit" :page="page"></ContactTab>
        </tab>
      </tabs>
    </div>
    <sidebar-left v-if="$root.isDesktop">
      <div class="card mb-3" v-if="pages.length > 0">
        <div class="card-header pb-2 pt-3">
          <strong>
            {{ page.slug }}
          </strong>
          <span class="mr-1"> دنبال می‌کند </span>
        </div>
        <div class="card-body px-2 py-1">
          <people-suggestion v-for="page in pages" :page="page" :key="page.id"></people-suggestion>
        </div>
      </div>
      <AppFooter class="sticky-aside"></AppFooter>
    </sidebar-left>
  </base-layout>
</template>

<script>
import AppLayout from "../../Layouts/AppLayout";
import NoContent from "../../Components/NoContent";

import ProfileHeader from "../../Components/Profile/ProfileHeader";

import { Inertia } from "@inertiajs/inertia";

export default {
  created() {
    this.actionsList = this.actions.data;
    this.next_page_url = this.actions.next_page_url;

    this.articlesList = this.articles.data;
    this.next_page_url = this.articles.next_page_url;

    this.current_tab = this.location;

    if (this.location.endsWith("articles") || this.location.endsWith("activities")) {
      this.showEdit = false;
    } else {
      this.showEdit = true;
    }
    this.current_tab = this.location;

    // if (!(this.showSkills || this.showExperiences || this.showEducations || this.checkUser(this.page.user_id) || (this.about != null && this.about.length > 0))) {
    //   this.showAbout = false;
    //   if (this.current_tab == "home") {
    //     this.current_tab = "activities";
    //     this.loadTab("/" + this.page.slug + "/activities", false);
    //   }
    // }
  },
  methods: {
    loadMore() {
      if (!this.loadingMore && this.next_page_url !== null) {
        const options = {
          method: "GET",
          headers: {
            "X-Inertia": "true",
          },
          url: this.next_page_url,
        };
        this.loadingMore = true;
        axios(options)
          .then((response) => {
            const data = response.data.props;
            if (data) {
              if (data.actions) {
                this.actionsList = data.actions.data;
                this.next_page_url = data.actions.next_page_url;
              }
              if (data.articles) {
                this.articlesList = data.articles.data;
                this.next_page_url = data.articles.next_page_url;
              }
            }
          })
          .catch((error) => {
            this.next_page_url = options.url;
          })
          .then(() => {
            this.loadingMore = false;
          });
      }
    },

    loadTab(link, pushState = true) {
      if (link.endsWith("articles") || link.endsWith("activities")) {
        this.showEdit = false;
      } else {
        this.showEdit = true;
      }

      if (pushState) {
        window.history.pushState({}, false, link);
      }

      const options = {
        method: "GET",
        headers: {
          "X-Inertia": "true",
        },
        url: link,
      };
      this.loadingTab = true;
      axios(options)
        .then((response) => {
          const data = response.data.props;
          if (data) {
            if (data.actions) {
              this.actionsList = data.actions.data;
              this.next_page_url = data.actions.next_page_url;
            }
            if (data.articles) {
              this.articlesList = data.articles.data;
              this.next_page_url = data.articles.next_page_url;
            }
          }
        })
        .catch((error) => {
          this.next_page_url = options.url;
        })
        .then(() => {
          this.loadingTab = false;
        });
    },

    tabChange(link, id) {
      this.current_tab = id;
      this.loadTab(link);
    },
    doEdit() {
      if (this.edit) {
        this.loadingSave = true;
        if (this.current_tab === "contact") {
          let data = this.$refs.contacts.getData();
          if (data) {
            axios
              .post("/contacts", {
                contacts: data,
              })
              .then((response) => {
                if (response.data.result) {
                  this.edit = false;
                } else {
                  this.handleError(response.data.errors);
                }
                this.loadingSave = false;
              })
              .then(() => {
                this.loadingSave = false;
              });
          } else {
            this.loadingSave = false;
            this.toast("ورودی‌ها نامعتبر است");
          }
        } else if (this.current_tab === "home") {
          let data = this.$refs.about.getData();
          axios
            .post("/save/resume", this.$refs.about.getData())
            .then((response) => {
              if (response.data.result) {
                this.edit = false;
              } else {
                this.handleError(response.data.errors, response.data.type);
              }
              this.loadingSave = false;
            })
            .then(() => {
              this.loadingSave = false;
            });
        }
      } else {
        this.edit = true;
      }
    },
    cancelEdit() {
      this.loadingTab = true;
      Inertia.reload({
        only: ["page"],
      });
      setTimeout(() => {
        this.loadingTab = false;
      }, 300);
      this.edit = false;
    },
  },
  data() {
    return {
      edit: false,
      about: null,
      loadingSave: false,
      current_tab: "",
      experiences: [],
      skills: [],
      categories: [],
      actionsList: [],
      articlesList: [],
      next_page_url: null,
      showEditModal: false,
      showEdit: true,
      loadingTab: false,
      loadingMore: false,
      showAbout: true,
    };
  },
  computed: {
    canEdit() {
      return this.page.user_id == window.user_id;
    },
    // showSkills() {
    //   if (this.checkUser(this.page.user_id) || (this.page.user.skills != null && this.page.user.skills.length > 0)) {
    //     return true;
    //   }
    //   return false;
    // },
    // showExperiences() {
    //   if (this.checkUser(this.page.user_id) || (this.page.about_data != null && this.page.about_data.experiences != null && this.page.about_data.experiences.length > 0)) {
    //     return true;
    //   }
    //   return false;
    // },
    // showEducations() {
    //   if (this.checkUser(this.page.user_id) || (this.page.about_data != null && this.page.about_data.educations != null && this.page.about_data.educations.length > 0)) {
    //     return true;
    //   }
    //   return false;
    // },
    // showAchievements() {
    //   if (this.checkUser(this.page.user_id) || (this.page.about_data != null && this.page.about_data.achievements != null && this.page.about_data.achievements.length > 0)) {
    //     return true;
    //   }
    //   return false;
    // },
  },
  name: "UserProfile",
  props: {
    currentCategory: {
      default: null,
      required: false,
    },
    pages: {
      type: Array,
      default: [],
    },
    page: {
      type: Object,
      default: undefined,
    },
    hasActivity: {
      type: Boolean,
      default: true,
    },
    hasAbout: {
      type: Boolean,
      default: true,
    },
    actions: {
      type: Object,
      default: () => {
        return {
          data: [],
          next_page_url: null,
        };
      },
    },
    articles: {
      type: Object,
      default: () => {
        return {
          data: [],
          next_page_url: null,
        };
      },
    },
    location: {
      type: String,
      default: "home",
    },
  },
  /**

       */
  components: {
    AboutTab: () =>
      import(
        /* webpackChunkName: "AboutMeTabProfile" */
        "../../Components/Profile/AboutMe/AboutMeTab"
      ),
    NewPostCard: () => import("../../Components/Cards/NewPostCard"),
    Categories: () => import("../../Components/Profile/Categories"),
    ActionCard: () => import("../../Components/PostCard/ActionCard"),
    NoContent,
    PostCard: () => import("../../Components/PostCard/PostCard"),
    ContactTab: () =>
      import(
        /* webpackChunkName: "ContactTabProfile" */
        "../../Components/Profile/Contact/ContactTab"
      ),
    ProfileHeader,
  },
  layout: AppLayout,
};
</script>
