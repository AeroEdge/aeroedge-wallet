<template>
  <div class="c-ent">
    <div class="c-ent--wrapper">
      <div class="c-ent__lang" id="lang">
        <v-select v-model="selectSelected" :options="selectOptions" :change="changeLang(selectSelected)"></v-select>
      </div>
      <div class="c-ent--wrapper__inner u-mt--10px">
        <div class="c-ent--box u-pt--0px">
          <button type="button" class="c-btn--back" @click="backPage"></button>
          <div class="c-ent--box__inner">
          <p class="c-ent__title__sub">{{ $tc('terms.title') }}</p>

            <!-- Sign In  -->
            <div class="c-ent__inner">
              <div class="c-form--terms">
                <p class="c-text--terms">{{ $tc('terms.title_sub') }}</p>
                <div class="c-terms--intro">{{ $tc('terms.content.intro') }}</div>
                <div class="c-terms--section">
                  <p class="c-terms--section__title">{{ $tc('terms.content.article1.title') }}</p>
                  <div class="c-terms--contents">
                    <p>{{ $tc('terms.content.article1.txt1') }}</p>
                    <p>{{ $tc('terms.content.article1.txt2') }}</p>
                  </div>
                </div>
                <div class="c-terms--section">
                  <p class="c-terms--section__title">{{ $tc('terms.content.article2.title') }}</p>
                  <div class="c-terms--contents">
                    <p>{{ $tc('terms.content.article2.txt1') }}</p>
                    <p>{{ $tc('terms.content.article2.txt2') }}</p>
                    <p>{{ $tc('terms.content.article2.txt3') }}</p>
                  </div>
                </div>
                <div class="c-terms--section">
                  <p class="c-terms--section__title">{{ $tc('terms.content.article3.title') }}</p>
                  <div class="c-terms--contents">
                    <p>{{ $tc('terms.content.article3.txt1') }}</p>
                    <p>{{ $tc('terms.content.article3.txt2.main') }}</p>
                    <div class="c-terms--contents__sub">
                      <p>{{ $tc('terms.content.article3.txt2.sub1') }}</p>
                      <p>{{ $tc('terms.content.article3.txt2.sub2') }}</p>
                      <p>{{ $tc('terms.content.article3.txt2.sub3') }}</p>
                      <p>{{ $tc('terms.content.article3.txt2.sub4') }}</p>
                    </div>
                  </div>
                </div>
                <div class="c-terms--section">
                  <p class="c-terms--section__title">{{ $tc('terms.content.article4.title') }}</p>
                  <div class="c-terms--contents">
                    <p>{{ $tc('terms.content.article4.txt1') }}</p>
                    <p>{{ $tc('terms.content.article4.txt2') }}</p>
                    <p>{{ $tc('terms.content.article4.txt3') }}</p>
                    <p>{{ $tc('terms.content.article4.txt4') }}</p>
                  </div>
                </div>
                <div class="c-terms--section">
                  <p class="c-terms--section__title">{{ $tc('terms.content.article5.title') }}</p>
                  <div class="c-terms--contents no-indent">
                    <p>{{ $tc('terms.content.article5.intro') }}</p>
                  </div>
                  <div class="c-terms--contents">
                    <p>{{ $tc('terms.content.article5.txt1') }}</p>
                    <p>{{ $tc('terms.content.article5.txt2') }}</p>
                    <p>{{ $tc('terms.content.article5.txt3') }}</p>
                    <p>{{ $tc('terms.content.article5.txt4') }}</p>
                    <p>{{ $tc('terms.content.article5.txt5') }}</p>
                    <p>{{ $tc('terms.content.article5.txt6') }}</p>
                    <p>{{ $tc('terms.content.article5.txt7') }}</p>
                    <p>{{ $tc('terms.content.article5.txt8') }}</p>
                    <p>{{ $tc('terms.content.article5.txt9') }}</p>
                    <p>{{ $tc('terms.content.article5.txt10') }}</p>
                    <p>{{ $tc('terms.content.article5.txt11') }}</p>
                    <p>{{ $tc('terms.content.article5.txt12') }}</p>
                    <p>{{ $tc('terms.content.article5.txt13') }}</p>
                    <p>{{ $tc('terms.content.article5.txt14') }}</p>
                  </div>
                </div>
                <div class="c-terms--section">
                  <p class="c-terms--section__title">{{ $tc('terms.content.article6.title') }}</p>
                  <div class="c-terms--contents">
                    <p>{{ $tc('terms.content.article6.txt1.main') }}</p>
                    <div class="c-terms--contents__sub">
                      <p>{{ $tc('terms.content.article6.txt1.sub1') }}</p>
                      <p>{{ $tc('terms.content.article6.txt1.sub2') }}</p>
                      <p>{{ $tc('terms.content.article6.txt1.sub3') }}</p>
                      <p>{{ $tc('terms.content.article6.txt1.sub4') }}</p>
                    </div>
                    <p>{{ $tc('terms.content.article6.txt2') }}</p>
                  </div>
                </div>
                <div class="c-terms--section">
                  <p class="c-terms--section__title">{{ $tc('terms.content.article7.title') }}</p>
                  <div class="c-terms--contents">
                    <p>{{ $tc('terms.content.article7.txt1.main') }}</p>
                    <div class="c-terms--contents__sub">
                      <p>{{ $tc('terms.content.article7.txt1.sub1') }}</p>
                      <p>{{ $tc('terms.content.article7.txt1.sub2') }}</p>
                      <p>{{ $tc('terms.content.article7.txt1.sub3') }}</p>
                      <p>{{ $tc('terms.content.article7.txt1.sub4') }}</p>
                      <p>{{ $tc('terms.content.article7.txt1.sub5') }}</p>
                      <p>{{ $tc('terms.content.article7.txt1.sub6') }}</p>
                    </div>
                    <p>{{ $tc('terms.content.article7.txt2') }}</p>
                  </div>
                </div>
                <div class="c-terms--section">
                  <p class="c-terms--section__title">{{ $tc('terms.content.article8.title') }}</p>
                  <div class="c-terms--contents">
                    <p>{{ $tc('terms.content.article8.txt1') }}</p>
                    <p>{{ $tc('terms.content.article8.txt2') }}</p>
                    <p>{{ $tc('terms.content.article8.txt3') }}</p>
                    <p>{{ $tc('terms.content.article8.txt4') }}</p>
                  </div>
                </div>
                <div class="c-terms--section">
                  <p class="c-terms--section__title">{{ $tc('terms.content.article9.title') }}</p>
                  <div class="c-terms--contents">
                    <p>{{ $tc('terms.content.article9.txt1') }}</p>
                    <p>{{ $tc('terms.content.article9.txt2') }}</p>
                  </div>
                </div>
                <div class="c-terms--section">
                  <p class="c-terms--section__title">{{ $tc('terms.content.article10.title') }}</p>
                  <div class="c-terms--contents no-indent">
                    <p>{{ $tc('terms.content.article10.txt1') }}</p>
                  </div>
                </div>
                <div class="c-terms--section">
                  <p class="c-terms--section__title">{{ $tc('terms.content.article11.title') }}</p>
                  <div class="c-terms--contents no-indent">
                    <p>{{ $tc('terms.content.article11.txt1') }}</p>
                  </div>
                </div>
                <div class="c-terms--section">
                  <p class="c-terms--section__title">{{ $tc('terms.content.article12.title') }}</p>
                  <div class="c-terms--contents no-indent">
                    <p>{{ $tc('terms.content.article12.txt1') }}</p>
                  </div>
                </div>
                <div class="c-terms--section">
                  <p class="c-terms--section__title">{{ $tc('terms.content.article13.title') }}</p>
                  <div class="c-terms--contents no-indent">
                    <p>{{ $tc('terms.content.article13.txt1') }}</p>
                  </div>
                </div>
                <div class="c-terms--section">
                  <p class="c-terms--section__title">{{ $tc('terms.content.article14.title') }}</p>
                  <div class="c-terms--contents no-indent">
                    <p>{{ $tc('terms.content.article14.txt1') }}</p>
                    <p><span class="c-terms--contents__address">{{ $tc('terms.content.article14.txt2') }}</span>{{ $tc('terms.content.article14.txt3') }}</p>
                  </div>
                </div>
                <div class="c-terms--section">
                  <p class="c-terms--section__title">{{ $tc('terms.content.article15.title') }}</p>
                  <div class="c-terms--contents">
                    <p>{{ $tc('terms.content.article15.txt1') }}</p>
                    <p>{{ $tc('terms.content.article15.txt2') }}</p>
                  </div>
                </div>
                <div class="u-mt--30px">{{ $tc('terms.content.rights') }}</div>
                <div class="u-mt--30px u-mb--30px">{{ $tc('terms.content.end') }}</div>
              </div>
            </div>

          </div><!-- c-ent--box__inner -->
        </div><!-- c-ent--box -->
      </div><!-- c-ent--wrapper__inner -->
    </div><!-- c-ent--wrapper -->
  </div><!-- c-ent-->
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import vSelect from 'vue-select'

export default {
  name: 'Terms',
  components: {
    vSelect
  },
  created: function () {
    if (this.pageLang === 'ja') {
      this.selectSelected = {id: 'ja', label: '日本語'}
      this.selectOptions = [{id: 'en', label: 'English'}]
    } else {
      this.selectSelected = {id: 'en', label: 'English'}
      this.selectOptions = [{id: 'ja', label: '日本語'}]
    }
  },
  data () {
    return {
      selectOptions: [
        {id: '', label: ''}
      ],
      selectSelected: {id: 'ja', label: '日本語'}
    }
  },
  watch: {
    pageLang: function (val) {
      if (this.pageLang === 'ja') {
        this.selectOptions = [{id: 'en', label: 'English'}]
      } else {
        this.selectOptions = [{id: 'ja', label: '日本語'}]
      }
    }
  },
  computed: {
    ...mapGetters('main', {
      pageLang: 'getPageLang'
    })
  },
  methods: {
    ...mapMutations('main', {
      changePageLang: 'changePageLang'
    }),
    backPage () {
      this.$router.push({name: 'Top'})
    },
    // 言語設定切り替え
    changeLang (lang) {
      this.$i18n.locale = lang.id
      this.changePageLang(lang.id)
    }
  }
}
</script>
