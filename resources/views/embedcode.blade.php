<style>
      #frame-code-ternobo-{{ $randomhash }}-2312357345439 {
        overflow: hidden;
        padding-top: 56.25%; /* 16:9*/
        position: relative;
    }
    #frame-code-ternobo-{{ $randomhash }}-2312357345439 iframe{
        border: 0;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 450px;
    }
</style>
<div onclick="window.open('{{ $url }}', '_blank');" id="frame-code-ternobo-{{ $randomhash }}-2312357345439">
    <iframe src="{{ $post }}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" loading="lazy" allowfullscreen style="min-width: 400px;"></iframe>
</div>