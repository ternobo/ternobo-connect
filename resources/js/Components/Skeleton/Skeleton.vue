<script lang="jsx">
import themeStyle from './skeleton-theme.js';
const isEmptyVNode = (children) => {
  if (!children) return true;
  const [firstNode] = children;
  let str = firstNode.text;
  if (str) {
    // remove all line-break and space character
    str = str.replace(/(\n|\r\n|\s)/g, '');
  }
  return typeof firstNode.tag === 'undefined' && !str;
};
export default {
  name: 'PuSkeleton',
  inject: {
    theme: {
      from: '_skeletonTheme',
      default: ({})
    }
  },
  props: {
    color:{
        default: "#EEEEEE",
    },
    classes:{
       default:()=>[],
    },
    styles:{
      default: ()=>[],
    },
    prefix: {
      type: String,
      default: 'pu'
    },
    count: {
      type: Number,
      default: 1
    },
    duration: {
      type: Number,
      default: 1.5
    },
    tag: {
      type: String,
      default: 'span'
    },
    width: [String, Number],
    height: [String, Number],
    circle: Boolean,
    loading: undefined
  },
  computed: {
    isLoading() {
      return typeof this.theme.loading !== 'undefined' ? this.theme.loading : this.loading;
    }
  },
  render(h) {
    const {
      width, height, prefix, circle, count, tag, isLoading
    } = this;
    const classes = [`${prefix}-skeleton`,...this.classes];
    const elements = [];
    const styles = { ...themeStyle(this.color), ...this.styles };


    if (width) styles.width = width;
    if (height) styles.height = height;
    if (circle) styles.borderRadius = '50%';
    for (let i = 0; i < count; i += 1) {
      elements.push(
        <span
          key={i}
          class={classes}
          style={styles}>
          &zwnj;
        </span>
      );
    }
    const showLoading = typeof isLoading !== 'undefined' ? isLoading : isEmptyVNode(this.$slots.default);
    if (tag) {
      return h(tag,{class: "skeleton-container"}, !showLoading ? this.$slots.default : elements);
    }
    return (!showLoading ? this.$slots.default : <span class="skeleton-container">{ elements }</span>);
  }
};
</script>