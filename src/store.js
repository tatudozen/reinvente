export const store = {
    state: {
        currentCategory: null,
        answers: {},
        history: []
    },

    init() {
        const saved = localStorage.getItem('combustivel_interior_data');
        if (saved) {
            this.state = JSON.parse(saved);
        }
    },

    setCategory(categoryId) {
        this.state.currentCategory = categoryId;
        this.save();
    },

    saveAnswer(categoryId, questionIndex, answer) {
        if (!this.state.answers[categoryId]) {
            this.state.answers[categoryId] = {};
        }
        this.state.answers[categoryId][questionIndex] = answer;
        this.save();
    },

    getAnswer(categoryId, questionIndex) {
        return this.state.answers[categoryId]?.[questionIndex] || '';
    },

    save() {
        localStorage.setItem('combustivel_interior_data', JSON.stringify(this.state));
    },

    reset() {
        this.state = {
            currentCategory: null,
            answers: {},
            history: []
        };
        this.save();
    }
};
