module Refinery
  module Ufps
    class UfpsController < ::ApplicationController

      before_filter :find_all_ufps
      before_filter :find_page

      def index
        # you can use meta fields from your model instead (e.g. browser_title)
        # by swapping @page for @ufp in the line below:
        present(@page)
      end

      def show
        @ufp = Ufp.find(params[:id])

        # you can use meta fields from your model instead (e.g. browser_title)
        # by swapping @page for @ufp in the line below:
        present(@page)
      end

    protected

      def find_all_ufps
        @ufps = Ufp.order('position ASC')
      end

      def find_page
        @page = ::Refinery::Page.where(:link_url => "/ufps").first
      end

    end
  end
end
